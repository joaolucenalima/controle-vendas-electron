import { IPC_CHANNELS } from "@shared/ipc";
import { ipcMain } from "electron";

export function registerProductHandlers() {
	ipcMain.handle(IPC_CHANNELS.GET_ALL_PRODUCTS, async () => {
    return "todos usuários"
  });
}