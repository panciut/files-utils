// frontend/preload.js

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  selectFiles: () => ipcRenderer.invoke("select-files"),
  selectDirectories: () => ipcRenderer.invoke("select-directories"),
});
