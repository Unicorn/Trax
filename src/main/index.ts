import * as path from 'path'
import { format as formatUrl } from 'url'
import { app, BrowserWindow, dialog, Tray, ipcMain, autoUpdater } from 'electron'
import createMenu from './menu'

declare const __static: string

const isDev = process.env.NODE_ENV !== 'production'
let mainWindow: BrowserWindow | null
let tray: Tray | null

const setupDevEnvironment = () => {
  /**
   * Hotfix for app name and path
   * @see https://github.com/electron-userland/electron-webpack/issues/239
   */
  const appName = 'Trax'
  app.setName(appName)
  const appData = app.getPath('appData')
  app.setPath('userData', path.join(appData, appName))

  // Open Dev Tools and install react/redux extensions
  mainWindow && mainWindow.webContents.openDevTools()

  const { default: installExtension, REACT_DEVELOPER_TOOLS, REACT_PERF, REDUX_DEVTOOLS } = require('electron-devtools-installer')

  const extensions = [REACT_DEVELOPER_TOOLS, REACT_PERF, REDUX_DEVTOOLS]

  extensions.map(name => {
    installExtension(name)
      .then((name: string) => console.log(`Added Extension:  ${name}`))
      .catch((err: Error) => console.log('An error occurred: ', err))
  })
}

const createTray = () => {
  tray = new Tray(path.resolve(__static, 'icons/tray.png'))
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    backgroundColor: '#F4F0E8',
    icon: path.resolve(__static, 'icons/icon.png'),
    show: false,
    width: 900,
    height: 680,
    webPreferences: {
      experimentalFeatures: true,
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.resolve(__static, 'preload.js')
    }
  })

  if (isDev) {
    mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    mainWindow.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
      })
    )
  }

  mainWindow.maximize()

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow && mainWindow.show()
    mainWindow && mainWindow.focus()
  })

  mainWindow.on('closed', () => app.quit())
}

app.on('ready', () => {
  if (isDev) setupDevEnvironment()

  createMenu()
  createWindow()
  createTray()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

ipcMain.on('timer-tick', (_: any, time: any) => {
  tray!.setTitle(time)
})

if (isDev) {
  app.on('certificate-error', (event, _webContents, _url, _error, _certificate, callback) => {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault()
    callback(true)
  })
}

//
// AutoUpdater
//
autoUpdater.on('update-downloaded', (_, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, response => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})

autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
