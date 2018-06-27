import { remote, ipcRenderer, shell } from 'electron'

declare global {
  interface Window {
    app: any
    BrowserWindow: any
    eval: any
    ipc: any
    shell: any
  }
}

window.app = {
  version: remote.app.getVersion()
}

window.BrowserWindow = remote.BrowserWindow
window.shell = shell
window.ipc = ipcRenderer

window.eval = global.eval = function() {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
