package main

import (
	"context"
	"fmt"
	"log"
	"os/exec"

	"github.com/google/shlex"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) OpenTerminal(extra string) string {
	fmt.Println(extra)
	args := []string{"/c", "wt", "-w", "0"}
	if extra != "" {
		extraArgs, err := shlex.Split(extra)
		if err != nil {
			log.Fatalf("Failed to parse extra arguments: %v", err)
		}
		args = append(args, extraArgs...)
	}
	fmt.Println(args)
	cmd := exec.Command("cmd.exe", args...)

	if err := cmd.Run(); err != nil {
		log.Fatal(err)
		fmt.Printf("Failed to start!")
	}

	return "Opening terminal..."
}
