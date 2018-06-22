import * as React from 'react'

const Board: React.SFC = () => (
  <div>
    <header className="search">
      <input
        type="text"
        placeholder="Search for tasks..."
      />

      <div className="actions">
        <button className="brown basic micro button">
          Reload
        </button>
      </div>
    </header>

  </div>
)

export default Board
