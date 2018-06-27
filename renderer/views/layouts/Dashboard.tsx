import * as React from 'react'
import Navigation from 'views/sections/Navigation'

interface Props {
  children: React.ReactNode
}

const Dashboard: React.SFC = ({ children }) => (
  <div>
    <div>
      <header className="toolbar">
        <div className="actions">
          <button className="basic micro button">
            Create Issue
          </button>
        </div>
      </header>

      <Navigation />
    </div>

    <main className="dashboard">
      {children}
    </main>
  </div>
)

export default Dashboard
