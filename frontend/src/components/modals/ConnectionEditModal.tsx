import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { models } from "$/go/models";

interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsSheetOpen: (open: boolean) => void;
  connection?: models.Connection;
}

export function ConnectionEditModal({
  isOpen,
  onClose,
  setIsSheetOpen,
  connection,
}: ConnectionModalProps) {
  let folders: models.Folder[] = [];

  return (
    <Sheet open={isOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Connection Properties</SheetTitle>
          <SheetDescription>View and edit connection details</SheetDescription>
        </SheetHeader>
        {connection && (
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={connection.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="host">Host</Label>
              <Input id="host" value={connection.host} readOnly />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="port">Port</Label>
                <Input id="port" value={connection.port} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={connection.username} readOnly />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="folder">Folder</Label>
              <Select disabled>
                <SelectTrigger id="folder">
                  <SelectValue
                    placeholder={
                      folders.find((f) => f.id === connection.folder?.id)
                        ?.name || "No Folder"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {folders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.id.toString()}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth-method">Authentication Method</Label>
              <Select disabled>
                <SelectTrigger id="auth-method">
                  <SelectValue placeholder="Select authentication method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="password">Password</SelectItem>
                  <SelectItem value="key">SSH Key</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <Button
              onClick={() => handleOpenConnection(connection)}
              className="w-full"
            >
              Open Connection
            </Button> */}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
