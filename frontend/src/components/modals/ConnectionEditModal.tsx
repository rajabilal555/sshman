import { useEffect, useState } from "react";
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
import useAppConfigStore from "@/stores/appConfig";

interface ConnectionModalProps {
  isOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
  connection?: models.Connection;
}

export function ConnectionEditModal({
  isOpen,
  setIsSheetOpen,
  connection,
}: ConnectionModalProps) {

  let [tempConnection, setTempConnection] =
  useState<models.Connection>(connection??{} as models.Connection);

  // if connection changes we need to update/reset the temp connection
  useEffect(() => {
    setTempConnection(connection ?? {} as models.Connection);
  }, [connection]);

  let folders = useAppConfigStore((state) => state.folders);
  let updateConnection = useAppConfigStore((state) => state.updateConnection);

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
              <Input
                id="name"
                value={tempConnection.name}
                onChange={(e) =>
                  setTempConnection({
                    ...tempConnection,
                    name: e.target.value,
                  } as models.Connection)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="host">Host</Label>
              <Input
                id="host"
                value={tempConnection.host}
                onChange={(e) =>
                  setTempConnection({
                    ...tempConnection,
                    host: e.target.value,
                  } as models.Connection)
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  value={tempConnection.port}
                  onChange={(e) =>
                    setTempConnection({
                      ...tempConnection,
                      port: parseInt(e.target.value),
                    } as models.Connection)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={tempConnection.username}
                  onChange={(e) =>
                    setTempConnection({
                      ...tempConnection,
                      username: e.target.value,
                    } as models.Connection)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="folder">Folder</Label>
              <Select
                onValueChange={(value) => {
                  setTempConnection({
                    ...tempConnection,
                    folder: folders.find((f) => f.id === value),
                  } as models.Connection);
                }}
              >
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
              <Label htmlFor="auth-method">Authentication Method (WIP)</Label>
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
            <Button
              onClick={() => {
                updateConnection({ ...tempConnection } as models.Connection);
                setIsSheetOpen(false);
              }}
              className="w-full"
            >
              Save
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
