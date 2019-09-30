import { app, Menu, MenuItemConstructorOptions } from 'electron'
import { updater } from 'update-electron-app'

export default (): void => {
  const checkForUpdates = (): void => {
    updater()
  }

  // CREATE MENU
  const template: MenuItemConstructorOptions[] = [
    {
      label: process.platform === 'darwin' ? app.getName() : 'File',
      submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit' }, { label: 'Check for Update', click: checkForUpdates }]
    },
    {
      label: 'Edit',
      submenu: [{ role: 'selectAll' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'delete' }]
    },
    {
      label: 'View',
      submenu: [{ role: 'reload' }, { role: 'toggleDevTools' }]
    }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
