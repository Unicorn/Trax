import { google, sheets_v4 } from 'googleapis' // eslint-disable-line @typescript-eslint/camelcase
import { GaxiosResponse } from 'gaxios'
import { GoogleAuth, GoogleTimesheet } from '@/models/google'
import { formatDate } from './timerHelper'

const sheets = google.sheets('v4')

type Spreadsheet = GaxiosResponse<sheets_v4.Schema$Spreadsheet> // eslint-disable-line @typescript-eslint/camelcase
type AddRow = GaxiosResponse<sheets_v4.Schema$BatchUpdateSpreadsheetResponse> // eslint-disable-line @typescript-eslint/camelcase

export const createGoogleClient = ({ accessToken, refreshToken, tokenType }: GoogleAuth): void => {
  window.googleClient = new google.auth.OAuth2()
  accessToken &&
    window.googleClient.setCredentials({
      access_token: accessToken, // eslint-disable-line @typescript-eslint/camelcase
      refresh_token: refreshToken, // eslint-disable-line @typescript-eslint/camelcase
      token_type: tokenType // eslint-disable-line @typescript-eslint/camelcase
    })
}

export const checkSheetAccess = ({ spreadsheetId }: GoogleTimesheet): Promise<Spreadsheet> =>
  new Promise((resolve, reject) => {
    const request = {
      auth: window.googleClient,
      spreadsheetId,
      ranges: []
    }

    sheets.spreadsheets.get(request, (err: Error | null, res?: Spreadsheet | null) => {
      return res && !err ? resolve(res) : reject(err)
    })
  })

const emptyRow = `${formatDate(new Date())}, =NOW()`
export const addRowToSheet = ({ spreadsheetId, sheetId, data = emptyRow }: GoogleTimesheet): Promise<AddRow> =>
  new Promise((resolve, reject) => {
    const request = {
      auth: window.googleClient,
      spreadsheetId,
      requestBody: {
        requests: [
          {
            insertDimension: {
              inheritFromBefore: false,
              range: {
                sheetId,
                startIndex: 1,
                endIndex: 2,
                dimension: 'ROWS'
              }
            }
          },
          {
            pasteData: {
              data,
              type: 'PASTE_NORMAL',
              delimiter: ',',
              coordinate: {
                sheetId,
                rowIndex: 1,
                columnIndex: 0
              }
            }
          }
        ]
      }
    }

    console.log('request', request)

    sheets.spreadsheets.batchUpdate(request, (err: Error | null, res?: AddRow | null) => {
      return res && !err ? resolve(res) : reject(err)
    })
  })
