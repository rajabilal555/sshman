package models

type AppConfig struct {
	Folders     []Folder     `json:"folders"`
	Connections []Connection `json:"connections"`
	// nullable
	DefaultConnectionSettings *Connection `json:"defaultConnectionSettings",omitempty`
}
