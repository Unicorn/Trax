import axios from 'axios'
import { camelizeKeys } from 'horseshoes'
import { GoogleAuth } from '@/models/google'
import { GithubAuth } from '@/models/github'

type ParseCodeResponse = { code?: string | null; error?: Error | null }

export const parseCode = (url: string): ParseCodeResponse => {
  const parsed = new URL(url)
  const code = parsed.searchParams.get('code')
  const error = parsed.searchParams.get('error')

  return { code, error: error ? new Error(error) : null }
}

export const getToken = async (url: string, code: string): Promise<GoogleAuth | GithubAuth> => {
  return axios.get(`${url}?code=${code}`).then(response => camelizeKeys(response.data.data))
}

export const authorizeApp = (authUrl: string, filter: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const win = new window.BrowserWindow({
      width: 600,
      height: 750,
      show: false,
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        nodeIntegration: false
      }
    })
    win.loadURL(authUrl)
    win.show()

    win.webContents.session.webRequest.onBeforeRequest({ urls: [filter] }, details => {
      const { code, error } = parseCode(details.url)
      win.destroy()
      return code && !error ? resolve(code) : reject(error)
    })
  })
