import React from 'react'

const TabNav = ({ index, text, clickHandler }) => (
  <button onClick={clickHandler} data-index={index} />
)

export default TabNav
