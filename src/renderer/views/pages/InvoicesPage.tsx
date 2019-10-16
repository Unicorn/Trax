/** @jsx createElement **/
import { createElement, SFC, Fragment, ReactNode, FormEvent } from 'react'
import { connect } from 'react-redux'
import { toArray } from 'horseshoes'
import { RootState } from '@/models/app'
import { Invoices, Invoice } from '@/models/invoice'
import { Timer } from '@/models/timer'
import { timersDuration, timerDuration, formatDate } from '@/helpers/timerHelper'
import { BrowserWindow } from 'electron'

interface Connected {
  invoices: Invoices
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
    // win.show()
  })

const renderTimerEntry = (timer: Timer): ReactNode => {
  const beginDate = timer.entries[0].startedAt
  const endDate = timer.entries.slice(-1)[0].stoppedAt
  return (
    <tr key={timer.key} className="detail">
      <td>{timer.issue && timer.issue.title}</td>
      <td>{beginDate && formatDate(beginDate)} - {endDate && formatDate(endDate)}</td>
      <td>{timerDuration(timer, true)}</td>
      <td>
        <button className="button micro yellow">Edit</button>
        <button className="button micro red">Delete</button>
      </td>
    </tr>
  )
}

const InvoicesPage: SFC<Connected> = props => {
  const invoices: Invoice[] = toArray(props.invoices) as Invoice[]

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

      <table className="clickable collapsed" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <Fragment key={invoice.key}>
              <tr>
                <td>{invoice.key}</td>
                <td>{formatDate(invoice.createdAt)}</td>
                <td>{timersDuration(invoice.timers, true)}</td>
                <td>
                  <button className="button micro brown" value={invoice.key} onClick={_showInvoice}>View</button>
                  <button className="button micro brown" value={invoice.key} onClick={_downloadInvoice}>Download</button>
                </td>
              </tr>
              {invoice.timers.map(renderTimerEntry)}
            </Fragment>
          ))}
        </tbody>
      </table>
    </section>
  )
}

const mapState = (state: RootState): Connected => ({
  invoices: state.invoices
})

export default connect(mapState)(InvoicesPage)
