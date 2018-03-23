import { github } from 'controllers/githubController'
import { GITHUB } from 'config/constants'

//
// Pulled from:
// https://github.com/manosim/gitify/blob/07dbfab25eb55292989fc9ae6d14a6b2052271e7/src/js/utils/helpers.js#L42
//
export const githubAuthWindow = (dispatch, authOptions = GITHUB) => {
  const electron = window.require('electron')
  const remote = electron.remote
  const BrowserWindow = remote.BrowserWindow
  const dialog = remote.dialog

  // Build the OAuth consent page URL
  const win = new BrowserWindow({
    width: 600,
    height: 750,
    show: true,
    titleBarStyle: 'hidden-inset',
    webPreferences: {
      nodeIntegration: false,
    },
  })

  const githubUrl = `${authOptions.host}/login/oauth/authorize?`
  const authUrl = `${githubUrl}client_id=${authOptions.client_id}&scope=${
    authOptions.scope
  }`

  win.loadURL(authUrl)

  const handleCallback = url => {
    const raw_code = /code=([^&]*)/.exec(url) || null
    const code = raw_code && raw_code.length > 1 ? raw_code[1] : null
    const error = /\?error=(.+)$/.exec(url)

    // Close the browser if code found or error
    if (code || error) win.destroy()

    // If there is a code, proceed to get code from github
    if (code)
      return dispatch(github.auth({}, { body: { ...authOptions, code } }))
    else if (error)
      alert(
        "Oops! Something went wrong and we couldn't log you in using Github. Please try again."
      )
  }

  // If "Done" button is pressed, hide "Loading"
  win.on('close', () => win.destroy())

  win.webContents.on(
    'did-fail-load',
    (event, errorCode, errorDescription, validatedURL) => {
      if (validatedURL.includes(authOptions.host)) {
        win.destroy()
        dialog.showErrorBox(
          'Invalid Hostname',
          `Could not load https://${authOptions.host}/.`
        )
      }
    }
  )

  win.webContents.on('will-navigate', (event, url) => handleCallback(url))

  win.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) =>
    handleCallback(newUrl)
  )
}
