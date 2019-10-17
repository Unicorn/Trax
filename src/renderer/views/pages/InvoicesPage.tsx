/** @jsx createElement **/
import { createElement, FormEvent, SFC } from 'react'
import { connect } from 'react-redux'
import { toArray } from 'horseshoes'
import { BrowserWindow } from 'electron'
import { RootState } from '@/models/app'
import { Invoice } from '@/models/invoice'
import { timersDuration, formatDate, timeToCost } from '@/helpers/timerHelper'

interface Connected {
  invoices: readonly Invoice[]
  rate: number
}

const invoiceWindow = (key: string): Promise<BrowserWindow> =>
  new Promise((resolve) => {
    const win = new window.BrowserWindow({
      width: 600,
      height: 750,
      show: false,
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        nodeIntegration: true
      }
    })
    win.loadURL(`${window.location.href}?invoice=${key}`).then(() => resolve(win))
  })

const InvoicesPage: SFC<Connected> = ({ invoices, rate }) => {
  const _showInvoice = async (e: FormEvent<HTMLButtonElement>) => {
    try {
      const win = await invoiceWindow(e.currentTarget.value)
      win.show()
    } catch (error) {
      console.log("Error rendering invoice window", error)
    }
  }

  const _downloadInvoice = async (e: FormEvent<HTMLButtonElement>) => {
    try {
      const printOptions = {
        landscape: false,
        marginsType: 0,
        printBackground: false,
        printSelectionOnly: false,
        pageSize: "A4",
      }
      const win = await invoiceWindow(e.currentTarget.value)
      const pdf = await win.webContents.printToPDF(printOptions)
      const saveDialog = await window.dialog.showSaveDialog({})

      if (!saveDialog.canceled && saveDialog.filePath && pdf) {
        console.log("Send pdf to main thread", win, pdf, saveDialog)
        window.ipc.send('print-invoice', { path: saveDialog.filePath, pdf })
      }
    } catch (error) {
      console.log("Error rendering invoice window", error)
    }
  }

  return (
    <section className="invoice page">
      <h1>Invoice</h1>

      <table className="clickable collapsed">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Date</th>
            <th>Time</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.key}>
              <td>{invoice.key}</td>
              <td>{formatDate(invoice.createdAt)}</td>
              <td>{timersDuration(invoice.timers, true)}</td>
              <td>{timeToCost(invoice.timers, rate)}</td>
              <td>
                <button className="button micro brown" value={invoice.key} onClick={_showInvoice}>View</button>
                <button className="button micro brown" value={invoice.key} onClick={_downloadInvoice}>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

const mapState = ({ settings, invoices }: RootState): Connected => ({
  invoices: toArray<Invoice>(invoices),
  rate: settings.invoices.rate ? parseInt(settings.invoices.rate) : 0
})

export default connect(mapState)(InvoicesPage)
