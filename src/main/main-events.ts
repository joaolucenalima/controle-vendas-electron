import { ipcMain, app } from 'electron'

const userDataPath = app.getPath("userData")

ipcMain.on('get-data-path', (event) => {
  event.returnValue = userDataPath
})