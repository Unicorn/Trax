const { remote, ipcRenderer } = require("electron")

window.ELECTRON_DISABLE_SECURITY_WARNINGS = true

window.app = {
  version: remote.app.getVersion()
};

window.ipc = ipcRenderer
