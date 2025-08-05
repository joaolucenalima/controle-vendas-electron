import { contextBridge, ipcRenderer } from "electron";
import { IPC_CHANNELS } from "@shared/ipc";

contextBridge.exposeInMainWorld("api", {
	product: {
		getAll: () => ipcRenderer.invoke(IPC_CHANNELS.GET_ALL_PRODUCTS),
	},
});
