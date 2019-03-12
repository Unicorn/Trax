"use strict";
exports.__esModule = true;
var path = require("path");
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
require('update-electron-app')();
var mainWindow;
var tray;
var installExtensions = function () {
    require('electron-debug')({ showDevTools: false, enabled: true });
    var _a = require('electron-devtools-installer'), installExtension = _a["default"], REACT_DEVELOPER_TOOLS = _a.REACT_DEVELOPER_TOOLS, REACT_PERF = _a.REACT_PERF, REDUX_DEVTOOLS = _a.REDUX_DEVTOOLS;
    var extensions = [REACT_DEVELOPER_TOOLS, REACT_PERF, REDUX_DEVTOOLS];
    extensions.map(function (name) {
        installExtension(name)
            .then(function (name) { return console.log("Added Extension:  " + name); })["catch"](function (err) { return console.log('An error occurred: ', err); });
    });
};
var createTray = function () {
    var iconPath = isDev ? '../public/icons/tray.png' : './icons/tray.png';
    tray = new electron_1.Tray(path.join(__dirname, iconPath));
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
            label: 'Trax',
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
            contextIsolation: false,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadURL(isDev
        ? 'https://localhost:3000'
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
electron_1.autoUpdater.on('update-downloaded', function (_, releaseNotes, releaseName) {
    var dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    };
    electron_1.dialog.showMessageBox(dialogOpts, function (response) {
        if (response === 0)
            electron_1.autoUpdater.quitAndInstall();
    });
});
electron_1.autoUpdater.on('error', function (message) {
    console.error('There was a problem updating the application');
    console.error(message);
});
electron_1.ipcMain.on('timer-tick', function (_, time) {
    tray.setTitle(time);
});
if (isDev) {
    electron_1.app.on('certificate-error', function (event, _webContents, _url, _error, _certificate, callback) {
        // On certificate error we disable default behaviour (stop loading the page)
        // and we then say "it is all fine - true" to the callback
        event.preventDefault();
        callback(true);
    });
}
