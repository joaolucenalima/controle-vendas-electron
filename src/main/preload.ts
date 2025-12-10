import { contextBridge, ipcRenderer } from "electron";
import { IPC_CHANNELS } from "../shared/ipc";

contextBridge.exposeInMainWorld("api", {
  product: {
    getAll: () => ipcRenderer.invoke(IPC_CHANNELS.GET_ALL_PRODUCTS),
    getById: (id: string) => ipcRenderer.invoke(IPC_CHANNELS.GET_PRODUCT_BY_ID, id),
    upsert: ({
      id,
      data,
    }: {
      id?: string;
      data: { name: string; priceInCents: number; imgUrl?: string };
    }) => ipcRenderer.invoke(IPC_CHANNELS.UPSERT_PRODUCT, { id, data }),
    delete: (id: string) => ipcRenderer.invoke(IPC_CHANNELS.DELETE_PRODUCT, id),
  },
});
