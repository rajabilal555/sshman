import { GetAppConfig, SaveAppConfig } from "$/go/app/App";
import { models } from "$/go/models";
import { create } from "zustand";

export interface AppConfigState {
  connections: models.Connection[];
  folders: models.Folder[];
  defaultConnection: models.Connection | undefined;
  updateConnection: (connection: models.Connection) => void;
  setConnections: (connections: models.Connection[]) => void;
  fetchFromBackend: () => Promise<void>;
  saveToBackend: () => Promise<void>;
}

const useAppConfigStore = create<AppConfigState>()((set, get) => ({
  connections: [],
  folders: [],
  defaultConnection: undefined,

  updateConnection: (connection: models.Connection) => {
    const connections = get().connections.map((c) =>
      c.id === connection.id ? connection : c
    );
    set({ connections });
    get().saveToBackend();
  },

  setConnections: (connections: models.Connection[]) => {
    set({ connections });
    get().saveToBackend();
  },

  fetchFromBackend: async () => {
    const data = await GetAppConfig();
    set({
      connections: data.connections,
      folders: data.folders,
      defaultConnection: data.defaultConnectionSettings,
    });
  },
  saveToBackend: async () => {
    const { connections, folders, defaultConnection } = get();
    await SaveAppConfig(models.AppConfig.createFrom({ connections, folders, defaultConnection }));
  },
}));

export default useAppConfigStore;
