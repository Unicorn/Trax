import React from 'react'
import { commitMutation, graphql } from 'react-relay'
import { environment } from 'controllers/relayController'

const mutation = graphql`
  mutation CreateProjectMutation($input: CreateProjectInput!) {
    createProject(input: $input) {
      project {
        id
        name
      }
    }
  }
`

const createProject = (repository, cb) => {
  commitMutation(environment, {
    mutation,
    variables: {
      input: {
        clientMutationId: 'Trax',
        name: 'Trax',
        body: 'An auto-generated project created and managed by the Trax App',
        ownerId: repository.id,
      },
    },
    onCompleted: (response, errors) => {
      cb({
        success: true,
        message: 'Upgraded Trax Project',
        projectId: response.createProject.project.id,
      })
    },
    onError: errors => cb({ success: false, message: errors }),
  })
}

export default createProject
