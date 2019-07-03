import { app, Menu, MenuItemConstructorOptions } from 'electron'

export default () => {
  const checkForUpdates = (): void => {
    require('update-electron-app')()
  }

  // CREATE MENU
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'Edit',
      submenu: [{ role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'delete' }, { role: 'selectall' }]
    },
    {
      label: 'View',
      submenu: [{ role: 'reload' }, { role: 'forcereload' }, { role: 'toggledevtools' }]
    }
  ]

  if (process.platform === 'darwin')
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        {
          label: 'Check for Update',
          click: checkForUpdates
        },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })

  if (process.platform === 'win32')
    template.unshift({
      label: 'File',
      submenu: [
        { role: 'about' },
        {
          label: 'Check for Update',
          click: checkForUpdates
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
