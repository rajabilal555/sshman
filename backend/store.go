package app

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sshman/backend/models"

	"github.com/adrg/xdg"
)

// Defaultmodels.AppConfig returns the default AppConfiguration.
func DefaultAppConfig() models.AppConfig {
	return models.AppConfig{
		Connections:               []models.Connection{},
		Folders:                   []models.Folder{},
		DefaultConnectionSettings: models.Connection{},
	}
}

type AppConfigStore struct {
	AppConfigPath string
	AppConfig     models.AppConfig
}

// NewAppConfigStore initializes a new AppConfigStore with the appropriate models.AppConfig path.
func NewAppConfigStore() (*AppConfigStore, error) {
	AppConfigFilePath, err := xdg.ConfigFile("sshman/config.json")
	if err != nil {
		return nil, fmt.Errorf("could not resolve path for models.AppConfig file: %w", err)
	}

	store := &AppConfigStore{AppConfigPath: AppConfigFilePath}
	store.AppConfig, err = store.Load()
	if err != nil {
		return nil, fmt.Errorf("could not load App Configuration: %w", err)
	}

	return store, nil
}

// models.AppConfig loads the AppConfiguration from the models.AppConfig file. If the file doesn't exist,
// it returns the default AppConfiguration.
func (s *AppConfigStore) Load() (models.AppConfig, error) {
	_, err := os.Stat(s.AppConfigPath)
	if os.IsNotExist(err) {
		return DefaultAppConfig(), nil
	}

	file, err := os.ReadFile(s.AppConfigPath)
	if err != nil {
		return models.AppConfig{}, fmt.Errorf("could not read the App Configuration file: %w", err)
	}

	if len(file) == 0 {
		return DefaultAppConfig(), nil
	}

	var cfg models.AppConfig
	if err := json.Unmarshal(file, &cfg); err != nil {
		return models.AppConfig{}, fmt.Errorf("App Configuration file does not have a valid format: %w", err)
	}

	return cfg, nil
}

// Save saves the given AppConfiguration to the models.AppConfig file.
func (s *AppConfigStore) Save(cfg models.AppConfig) error {
	// Ensure the directory for the models.AppConfig file exists
	dir := filepath.Dir(s.AppConfigPath)
	err := os.MkdirAll(dir, os.ModePerm)
	if err != nil {
		return fmt.Errorf("could not create App Configuration directory: %w", err)
	}

	file, err := json.MarshalIndent(cfg, "", "  ")
	if err != nil {
		return fmt.Errorf("could not marshal App Configuration: %w", err)
	}

	err = os.WriteFile(s.AppConfigPath, file, 0644)
	if err != nil {
		return fmt.Errorf("could not write App Configuration file: %w", err)
	}

	return nil
}

func (a *App) GetConnections() []models.Connection {
	return a.configStore.AppConfig.Connections
}
