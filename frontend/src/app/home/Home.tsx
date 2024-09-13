import AppLayout from "@/components/layout/AppLayout";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { models } from "$/go/models";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  Plus,
  Search,
  Terminal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { testData } from "@/lib/utils";
import { ConnectionEditModal } from "@/components/modals/ConnectionEditModal";
import { LogPrint } from "$/runtime/runtime";
import {
  GetAppConfig,
  LaunchSSH,
  LaunchTerminal,
  SaveAppConfig,
} from "$/go/app/App";
import ConnectionListItem from "@/components/shared/ConnectionListItem";
import useAppConfigStore from "@/stores/appConfig";

type Folder = models.Folder;
type Connection = models.Connection;

function Home() {
  let { testFolders, testConnections } = testData();

  const [folders, setFolders] = useState<Folder[]>(testFolders);

  const connections = useAppConfigStore((state) => state.connections);
  const setConnections = useAppConfigStore((state) => state.setConnections);
  useEffect(() => {
    useAppConfigStore.getState().fetchFromBackend();
  }, []);
  const [selectedConnection, setSelectedConnection] = useState<
    Connection | undefined
  >();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filteredConnections = useMemo(() => {
    return connections.filter(
      (conn) =>
        conn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conn.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conn.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [connections, searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      const foldersToExpand = filteredConnections
        .map((conn) => conn.folder?.id)
        .filter((folderId): folderId is string => folderId !== null);
      setExpandedFolders([...new Set(foldersToExpand)]);
    } else {
      setExpandedFolders([]);
    }
  }, [searchTerm, filteredConnections]);

  const handleEditConnection = (connection: Connection) => {
    setSelectedConnection(connection);
    setIsSheetOpen(true);
  };

  const handleOpenConnection = (connection: Connection) => {
    console.log(`Opening SSH connection to ${connection.host}`);
    setIsSheetOpen(false);
    LaunchSSH(connection);
  };

  const handleAddConnection = () => {
    const newConnection: models.Connection = models.Connection.createFrom({
      id: connections.length + 1 + "",
      name: "New Connection",
      host: "127.0.0.1",
      port: 22,
      username: "root",
      folder: undefined,
    });
    setConnections([...connections, newConnection]);
    setSelectedConnection(newConnection);
    setIsSheetOpen(true);
  };

  const handleAddFolder = () => {
    const newFolder: Folder = {
      id: folders.length + 1 + "",
      name: "New Folder",
    };
    setFolders([...folders, newFolder]);
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId]
    );
  };

  const renderConnections = (
    connections: Connection[],
    folderId: string | null
  ) => {
    return connections
      .filter((conn) => conn.folder?.id == folderId)
      .map((conn) => (
        <ConnectionListItem
          key={conn.id}
          connection={conn}
          onEdit={handleEditConnection}
          onClick={handleOpenConnection}
        />
      ));
  };

  return (
    <AppLayout>
      <main className="flex-1 overflow-hidden">
        <div className="container h-full p-4 mx-auto">
          <div className="flex flex-col h-full space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search connections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <ScrollArea className="flex-1">
              <ul className="pr-4 space-y-2">
                {folders.map((folder) => (
                  <li key={folder.id}>
                    <Collapsible open={expandedFolders.includes(folder.id)}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="outline"
                          className="justify-start w-full"
                          onClick={() => toggleFolder(folder.id)}
                        >
                          <Folder className="w-4 h-4 mr-2" />
                          {folder.name}
                          {expandedFolders.includes(folder.id) ? (
                            <ChevronDown className="w-4 h-4 ml-auto" />
                          ) : (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <ul className="mt-2 ml-4 space-y-2">
                          {renderConnections(filteredConnections, folder.id)}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                ))}
                {renderConnections(filteredConnections, null)}
              </ul>
            </ScrollArea>
            <div className="flex gap-2">
              <Button onClick={handleAddConnection} className="flex-1">
                <Plus className="w-4 h-4 mr-2" /> Add Connection
              </Button>
              <Button onClick={handleAddFolder} className="flex-1">
                <Plus className="w-4 h-4 mr-2" /> Add Folder
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={async () => {
                  const test = await GetAppConfig();
                  console.log(test);
                  LogPrint(JSON.stringify(test));
                }}
                className="flex-1"
              >
                Test
              </Button>
            </div>
          </div>
        </div>
      </main>
      <ConnectionEditModal
        connection={selectedConnection}
        isOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
    </AppLayout>
  );
}

export default Home;
