const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path')

import fs from 'fs'
require("./main-events")

const appPath = app.getAppPath()

function CreateWindow() {

  const icon = nativeImage.createFromPath('./build/icon.ico');

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  const mainWindow = new BrowserWindow({
    icon,
    width: 800,
    height: 700,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile(path.resolve(app.getAppPath(), './public/index.html'))

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

app.on('ready', CreateWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    CreateWindow()
  }
})

const isUnicWindow = app.requestSingleInstanceLock()

if (!isUnicWindow) {
  app.quit()
} else {
  app.whenReady().then(CreateWindow)
}

app.on('second-instance', () => {
  const win = BrowserWindow.getAllWindows()[0]
  if (win.isMinimized()) win.restore()
  win.center()
  win.focus()
})