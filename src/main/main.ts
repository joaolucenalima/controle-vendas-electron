import { app, BrowserWindow } from 'electron'
import path from 'path'
import fs from 'fs'

require("./main-events")

function verifyDatabaseDir() {
  //Definindo o diretório do banco de dados
  const database_dir = path.resolve(app.getPath("userData"), "database")

  //Se a pasta não existir, ela é criada
  if (!fs.existsSync(database_dir)) {
    fs.mkdirSync(database_dir)
  }
}

function CreateWindow() {

  const mainWindow = new BrowserWindow({
    icon: './build/favicon.ico',
    width: 800,
    height: 700,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadFile(path.resolve(app.getAppPath(), './public/index.html'))

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    CreateWindow()
  }
})

const isUnicWindow = app.requestSingleInstanceLock()

if (!isUnicWindow) {
  app.quit()
} else {
  app.whenReady().then(() => {
    verifyDatabaseDir()
    CreateWindow()
  })
}

app.on('second-instance', () => {
  const win = BrowserWindow.getAllWindows()[0]
  if (win.isMinimized()) win.restore()
  win.center()
  win.focus()
})

if (require('electron-squirrel-startup')) {
  app.quit()
}