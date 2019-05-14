import * as React from 'react'
import { connect } from 'react-redux'
import { requestAuth } from '@/controllers/authController'
import { AuthAction } from '@/models/auth'
import LogoNeon from '@/views/ui/icons/LogoNeon'

interface Actions {
  requestAuth: () => AuthAction
}

const WelcomePage: React.SFC<Actions> = ({ requestAuth }) => (
  <main className="welcome">
    <header className="hero">
      <LogoNeon />
    </header>

    <button className="large basic teal button" onClick={requestAuth}>Login with Github</button>

    <section>
      <h2>Mission</h2>
      <p>
        Sometimes waiting for a product that you want and need in your life just doesn’t make sense. Your productivity suffers everyday without it, and hours are lost managing mundane tasks. We recognized the need for such a product when we calculated the debt of operations across our whole team. We had tremendous overhead with collecting hours and invoices from a myriad of contractors and employees.  In addition each developer on our team spends at least a couple hours a day navigating github repositories. The complexity of many users, with many repositories, with many tasks.. starts to become a significant cognitive load.
      </p>
      <p>
        So we are creating a solution. We called it Trax. It started out as a simple application to manage time tracking. We didn’t want to adopt yet another product into our daily routine just to track something as trivial as the linear passage of time. Amongst other things, we’re trying to reduce the cognitive load and time spent managing tasks. Trax is more than just a time tracker though. It relies solely on github to offer a more streamlined experience while enhancing the capabilities of an already amazing service. It’s the user interface and experience we always dreamed of having, with some extra features thrown in for good measure.
      </p>
      <p>
        Trax lets you select any repo, from any organization and bring the issues of those repos into one kanban workflow. This lets you track your time against various dependencies you may have built for your organization, or even track maintenance and issues of completely unrelated repositories.
      </p>
    </section>
  </main>
)

const mapDispatch = ({
  requestAuth
})

export default connect(null, mapDispatch)(WelcomePage)
