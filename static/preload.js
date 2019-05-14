"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
window.app = {
  version: electron_1.remote.app.getVersion()
};
window.BrowserWindow = electron_1.remote.BrowserWindow;
window.shell = electron_1.shell;
window.ipc = electron_1.ipcRenderer;
