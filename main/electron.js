"use strict";
exports.__esModule = true;
var path = require("path");
var electron_1 = require("electron");
var isDev = function () { return (process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath)); };
var mainWindow;
var tray;
var installExtensions = function () {
    require('electron-debug')({ showDevTools: true, enabled: true });
    var _a = require('electron-devtools-installer'), installExtension = _a["default"], REACT_DEVELOPER_TOOLS = _a.REACT_DEVELOPER_TOOLS, REACT_PERF = _a.REACT_PERF, REDUX_DEVTOOLS = _a.REDUX_DEVTOOLS;
    var extensions = [REACT_DEVELOPER_TOOLS, REACT_PERF, REDUX_DEVTOOLS];
    extensions.map(function (name) {
        installExtension(name)
            .then(function (name) { return console.log("Added Extension:  " + name); })["catch"](function (err) { return console.log('An error occurred: ', err); });
    });
};
var createTray = function () {
    tray = new electron_1.Tray(path.join(__dirname, '../public/icons/trayTemplate.png'));
};
var createWindow = function () {
    // CREATE MENU
    var template = [
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
    ];
    if (process.platform === 'darwin')
        template.push({
            label: 'Foxtrot',
            submenu: [
                { role: 'about' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { role: 'quit' }
            ]
        });
    electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(template));
    mainWindow = new electron_1.BrowserWindow({
        titleBarStyle: 'hidden',
        backgroundColor: '#F4F0E8',
        icon: path.join(__dirname, 'icons/icon.png'),
        show: false,
        width: 900,
        height: 680,
        webPreferences: {
            // nodeIntegration: false
            webSecurity: false
        }
    });
    mainWindow.loadURL(isDev
        ? 'http://localhost:3000'
        : "file://" + path.join(__dirname, '../build/index.html'));
    mainWindow.maximize();
    mainWindow.webContents.on('did-finish-load', function () {
        mainWindow.show();
        mainWindow.focus();
    });
    mainWindow.on('closed', function () { return electron_1.app.quit(); });
};
electron_1.app.on('ready', function () {
    if (isDev)
        installExtensions();
    createWindow();
    createTray();
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.app.on('activate', function () {
    if (mainWindow === null)
        createWindow();
});
electron_1.ipcMain.on('timer-tick', function (_, time) {
    tray.setTitle(time);
});
