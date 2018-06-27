import * as path from 'path'
import { app, BrowserWindow, Menu, Tray, ipcMain } from 'electron'

const isDev = () => (process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath))

let mainWindow: BrowserWindow | null
let tray: Tray | null

const installExtensions = () => {
  require('electron-debug')({ showDevTools: true, enabled: true })

  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REACT_PERF,
    REDUX_DEVTOOLS
  } = require('electron-devtools-installer')

  const extensions = [REACT_DEVELOPER_TOOLS, REACT_PERF, REDUX_DEVTOOLS]

  extensions.map(name => {
    installExtension(name)
      .then((name: string) => console.log(`Added Extension:  ${name}`))
      .catch((err: Error) => console.log('An error occurred: ', err))
  })
}

const createTray = () => {
  tray = new Tray(path.join(__dirname, '../public/icons/trayTemplate.png'))
}

const createWindow = () => {
  // CREATE MENU
  const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' }
      ]
    },
    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }]
    }
  ]

  if (process.platform === 'darwin')
    template.push({
      label: 'Trax',
      submenu: [
        { role: 'about' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { role: 'quit' }
      ]
    })

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    backgroundColor: '#F4F0E8',
    icon: path.join(__dirname, 'icons/icon.png'),
    show: false,
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL(
    isDev
      ? 'https://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  mainWindow.maximize()

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow!.show()
    mainWindow!.focus()
  })

  mainWindow.on('closed', () => app.quit())
}

app.on('ready', () => {
  if (isDev) installExtensions()

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
