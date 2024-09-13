package app

import (
	"fmt"
	"log"
	"os/exec"
	"sshman/backend/models"

	"github.com/google/shlex"
)

func (a *App) LaunchSSH(connection models.Connection) {
	a.LaunchTerminal(fmt.Sprintf("ssh %s@%s -p %d", connection.Username, connection.Host, connection.Port))
}

func (a *App) LaunchTerminal(extra string) string {
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
