import { app, BrowserWindow } from "electron";
import fs from "fs";
import path from "path";
import { AppDataSource } from "./database/datasource";
import { registerHandlers } from "./ipc";

function verifyDatabaseDir() {
  const database_dir = path.resolve(app.getPath("userData"), "database");

  if (!fs.existsSync(database_dir)) {
    fs.mkdirSync(database_dir);
  }
}

const setupDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.info("Database initialized");
    const pendingMigrations = await AppDataSource.showMigrations();
    console.info("Pending migrations:", pendingMigrations);
    if (pendingMigrations) {
      console.info("Running migrations...");
      await AppDataSource.runMigrations();
      console.info("Migrations completed");
    }
  } catch (err) {
    console.error(err);
  }
};

function createWindow() {
  const mainWindow = new BrowserWindow({
    icon: "./build/favicon.ico",
    width: 1200,
    height: 700,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.setMenuBarVisibility(false);

  const IS_DEV = !app.isPackaged;

  if (IS_DEV) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "dist/rendered/index.html"));
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}

const isUnicWindow = app.requestSingleInstanceLock();

if (!isUnicWindow) {
  app.quit();
} else {
  app.whenReady().then(async () => {
    verifyDatabaseDir();
    createWindow();
    await setupDatabase();
    registerHandlers();
  });
}

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("second-instance", () => {
  const win = BrowserWindow.getAllWindows()[0];
  if (win.isMinimized()) win.restore();
  win.center();
  win.focus();
});

if (require("electron-squirrel-startup")) {
  app.quit();
}
