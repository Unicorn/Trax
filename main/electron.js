const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REACT_PERF,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer')
const {
  app,
  BrowserWindow,
  Menu,
  nativeImage,
  Tray,
  ipcMain,
} = require('electron')
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

let mainWindow
let tray

const installExtensions = async () => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err))

  installExtension(REACT_PERF)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err))

  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err))
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
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }],
    },
  ]

  if (process.platform === 'darwin')
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
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
      // nodeIntegration: false
      webSecurity: false,
    },
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:8080'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  mainWindow.maximize()

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', async () => {
  if (isDev) await installExtensions()

  createWindow()
  createTray()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

ipcMain.on('timer-tick', (event, time) => {
  tray.setTitle(time)
})
