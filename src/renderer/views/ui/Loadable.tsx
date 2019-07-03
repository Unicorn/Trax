/** @jsx createElement **/
import { createElement, SFC } from 'react'

interface Props {
  widgetName: string
  isLoading: boolean
  children: React.ReactNode
}

const Loadable: SFC<Props> = ({ widgetName, isLoading, children }) => (
  <div className={`loadable ${widgetName} ${isLoading && 'loading'}`}>
    {isLoading && (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    )}
    {children}
  </div>
)

export default Loadable
