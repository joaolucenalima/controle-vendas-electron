const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path')

function CreateWindow() {

  const icon = nativeImage.createFromPath('./build/icon.ico');

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  const mainWindow = new BrowserWindow({
    icon,
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile(path.resolve(app.getAppPath(), './public/index.html'))
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