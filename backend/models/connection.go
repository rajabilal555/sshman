package models

// Type definition for SSH Connections
type Connection struct {
	Id       string  `json:"id"`
	Name     string  `json:"name"`
	Host     string  `json:"host"`
	Port     int     `json:"port"`
	Username string  `json:"username"`
	Password *string `json:"password"` // encrypted nullable
	Folder   *Folder `json:"folder"`
}
