import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { github } from 'controllers/githubController'
import { githubAuthWindow } from 'helpers/githubAuthHelper'
import ExternalLink from 'views/ui/ExternalLink'
import { ROUTES } from 'config/constants'
import logo from 'assets/images/logo-text.svg'

const select = state => {
  return {
    auth: state.github.auth,
    profile: state.github.profile,
    tracks: state.tracks,
  }
}

class Welcome extends React.Component {
  componentWillMount = () => this.props.dispatch(github.profile())

  _githubAuth = () => {
    const { dispatch } = this.props
    githubAuthWindow(dispatch)
  }

  _renderLogin = () => {
    const { auth, tracks } = this.props

    if (auth.data && auth.data.loggedIn)
      return tracks.data.length > 0 ? (
        <Redirect to={ROUTES.board.path} />
      ) : (
        <Redirect to={ROUTES.profile.path} />
      )
    else
      return (
        <button
          className="large basic teal button"
          onClick={() => this._githubAuth()}
        >
          Login with Github
        </button>
      )
  }

  render = () => (
    <main className="welcome">
      <div className="left">
        <ExternalLink href="https://unicornagency.com" showIcon={false}>
          <img src={logo} width="250px" alt="Trax Logo" />
        </ExternalLink>

        <br />

        {this._renderLogin()}
      </div>

      <div className="right">
        <h2>Mission</h2>
        <p>
          Sometimes waiting for a product that you want and need in your life
          just doesn't make sense. Your productivity suffers everyday without
          it, and hours are lost managing mundane tasks. We recognized the need
          for this product when we calculated the debt of operations across our
          whole team. Not only was their tremendous overhead with collecting
          hours and invoices from a myriad of contractors and employees, but
          each developer spent at least a couple hours a day navigating github
          repositories. The complexity of many users, with many repositories,
          with many tasks.. starts to become a significant cognitive load.
        </p>
        <p>
          So we created <strong>Trax</strong>. It started out as an application
          to manage time tracking. We didn't want to dish out adopt yet another
          product into our daily routine just to track something as trivial as
          the linear passage of time. Amongst other things, we're trying to
          reduce the cognative load and time spent managing tasks. Trax is more
          than just a time tracker though. It relies soley on github to offer a
          more streamlined experience while enhancing the capabilities of an
          already amazing service. It's the user interface and experience we
          always dreamed of having, with some extra features thrown in for good
          measure.
        </p>
        <p>
          Trax lets you select any repo, from any organization and bring the
          issues of those repos into one kanban workflow. This lets you track
          your time against various dependencies you may have built for your
          organization, or even track maintenance and issues of completely
          unrelated repositories.
        </p>

        <blockquote>
          <p>
            <em>
              "One view to rule them all. One view to find them. One view to
              bring them all and in Kanban bind them."
            </em>
          </p>
          <p>
            <strong>-- Lord of the Rings ripoff, aka: geek humor</strong>
          </p>
        </blockquote>
      </div>
    </main>
  )
}

export default connect(select)(Welcome)
