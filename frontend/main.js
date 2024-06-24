// frontend/main.js

const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");
const waitOn = require("wait-on");

// Import and configure electron-reload
require("electron-reload")(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`),
});

function createWindow() {
  const { screen } = require("electron");
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadURL("http://localhost:3000"); // Adjust this URL to your app's URL

  mainWindow.webContents.on("did-fail-load", () => {
    console.log("Failed to load the content");
  });

  // Disable DevTools opening automatically
  //mainWindow.webContents.openDevTools();
}

app.on("ready", async () => {
  await waitOn({ resources: ["http://localhost:3000"] });
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("select-files", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
  });
  return result.filePaths;
});

ipcMain.handle("select-directories", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory", "multiSelections"],
  });
  return result.filePaths;
});
