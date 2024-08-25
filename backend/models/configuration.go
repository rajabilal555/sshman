package models

type AppConfig struct {
	Folders     []Folder     `json:"folders"`
	Connections []Connection `json:"connections"`
	//
	DefaultConnectionSettings Connection `json:"defaultConnectionSettings"`
}
