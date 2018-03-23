import React from 'react'
import { commitMutation, graphql } from 'react-relay'
import { environment } from 'controllers/relayController'

const mutation = graphql`
  mutation CreateProjectColumnMutation($input: AddProjectColumnInput!) {
    addProjectColumn(input: $input) {
      clientMutationId
    }
  }
`

const createProjectColumn = (projectId, name, cb) => {
  commitMutation(environment, {
    mutation,
    variables: {
      input: {
        clientMutationId: `Trax:${name}`,
        name,
        projectId,
      },
    },
    onCompleted: (response, errors) => {
      cb({
        success: true,
        message: 'Upgraded Trax Project',
        columnId: response.addProjectColumn.clientMutationId,
      })
    },
    onError: errors => cb({ success: false, message: errors }),
  })
}

export default createProjectColumn
