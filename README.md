# Trax - [Read Announcement](https://medium.com/@UnicornAgency/coming-soon-a-desktop-app-for-time-tracking-and-agile-with-github-ccb846b8255c)
Is a desktop app for managing time and tasks in a Kanban board. It has been built with:

- Electron
- React
- Redux
- Relay
- Typescript
- Babel
- Webpack


## Why we built Trax

![Screenshot of Profile](https://cdn-images-1.medium.com/max/2000/1*Y9rlATyXigaa0XVo2EoPVQ.png)

Sometimes waiting for a product that you want and need in your life just doesn’t make sense. Your productivity suffers everyday without it, and hours are lost managing mundane tasks. We recognized the need for such a product when we calculated the debt of operations across our whole team. We had tremendous overhead with collecting hours and invoices from a myriad of contractors and employees. In addition each developer on our team spends at least a couple hours a day navigating github repositories. The complexity of many users, with many repositories, with many tasks.. starts to become a significant cognitive load.

![Screenshot of Board](https://cdn-images-1.medium.com/max/2000/1*TZw7R4v6inNuz4TeRmj4yg.png)


## Prerequisites
You'll need at minimum, an [Oauth Token/Secret](https://developer.github.com/apps/building-oauth-apps/) from Github, as well as a [Personal Access Token](https://github.com/settings/tokens). You can drop these in a `.env` file in the project root like so:

```
GH_API_TOKEN=XXX
GH_CLIENT_ID=XXX
GH_CLIENT_SECRET=XXX
```

You'll also want the latest versions of Node, NPM, and yarn.

### Install
Installation is pretty straightforward. `yarn setup` will do a `yarn install` and `graphql get-schema` which uses your `GH_API_TOKEN` to fetch the graphql schema from github's api/self-discovery.

```
GH_API_TOKEN=XXX yarn setup
```

## Running the application
`yarn dev` will get everything started up in development, provided you have met the prerequisites. `yarn electron:build` will compile the application for regular use.

## Contributing
Fork and hack away, or open issues and help us organize bugs and features!
