const { remote, ipcRenderer, shell } = require("electron")

window.ELECTRON_DISABLE_SECURITY_WARNINGS = true

window.app = {
  version: remote.app.getVersion(),
};

window.shell = shell

window.BrowserWindow = remote.BrowserWindow

window.ipc = ipcRenderer
