import { ipcMain, app } from "electron";

ipcMain.on("get-data-path", (event) => {
	event.returnValue = app.getPath("userData");
});
