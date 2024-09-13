package app

import (
	"context"
	"fmt"
	"log"
)

// App struct
type App struct {
	ctx         context.Context
	configStore *AppConfigStore
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	configStore, err := NewAppConfigStore()
	if err != nil {
		log.Fatalf("Failed to create config store: %v", err)
	}
	log.Printf("App Configuration: %v", configStore.AppConfig)
	a.configStore = configStore
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	log.Default().Println("Test data: ", a.configStore.AppConfig)
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
