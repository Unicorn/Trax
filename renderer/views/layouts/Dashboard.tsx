import * as React from 'react'
import Navigation from 'views/sections/Navigation'

const Dashboard: React.SFC = () => (
  <div>
    <div>
      <header className="toolbar">
        <div className="actions">
          <button className="basic micro button">Create Issue</button>
        </div>
      </header>

      <Navigation />
    </div>

    <main className="dashboard"></main>
  </div>
)

export default Dashboard
