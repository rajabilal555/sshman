import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { models } from "$/go/models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function testData() {
  let testFolders = <models.Folder[]>[
    { id: "1", name: "Production" },
    { id: "2", name: "Staging" },
    { id: "3", name: "Development" },
  ];

  let testConnections = <models.Connection[]>[
    {
      id: "1",
      name: "Main Production Server",
      host: "prod.example.com",
      port: 22,
      username: "admin",
      folder: testFolders[0],
    },
    {
      id: "2",
      name: "Backup Production Server",
      host: "backup-prod.example.com",
      port: 22,
      username: "admin",
      folder: testFolders[0],
    },
    {
      id: "3",
      name: "Staging Server",
      host: "staging.example.com",
      port: 22,
      username: "developer",
      folder: testFolders[1],
    },
    {
      id: "4",
      name: "Development Server",
      host: "dev.example.com",
      port: 22,
      username: "developer",
      folder: testFolders[2],
    },
    {
      id: "5",
      name: "Database Server",
      host: "db.example.com",
      port: 22,
      username: "dbadmin",
    },
    {
      id: "6",
      name: "Backup Server",
      host: "backup.example.com",
      port: 22,
      username: "backupadmin",
    },
  ];
  return { testFolders,  testConnections };
}
