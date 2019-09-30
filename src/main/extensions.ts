import * as path from 'path'
import { app, BrowserWindow } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS, REACT_PERF, REDUX_DEVTOOLS } from 'electron-devtools-installer'

export const installExtensions = (mainWindow: BrowserWindow): void => {
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

  const extensions = [REACT_DEVELOPER_TOOLS, REACT_PERF, REDUX_DEVTOOLS]

  extensions.map((name): void => {
    installExtension(name)
      .then((name: string): void => console.log(`Added Extension:  ${name}`))
      .catch((err: Error): void => console.log('An error occurred: ', err))
  })
}
