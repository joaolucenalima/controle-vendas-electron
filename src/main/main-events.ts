import { ipcMain, app } from 'electron'

const appPath = app.getAppPath()

ipcMain.on('app-path', (event) => {
  event.returnValue = appPath
})