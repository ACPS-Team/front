import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { print } from 'graphql'
import api from './api'

interface GraphQLResponse<TResult> {
  data: TResult
  errors?: Array<{ message: string }>
}

export function useGraphQLMutation<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  options?: {
    onSuccess?: (data: TResult) => void
    onError?: (error: Error) => void
  }
): UseMutationResult<TResult, Error, TVariables> {
  return useMutation({
    mutationFn: async (variables: TVariables) => {
      try {
        const response = await api.post<GraphQLResponse<{ [key: string]: TResult }>>('/graphql', {
          query: print(document),
          variables
        })

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message)
        }

        // Get the mutation name from the document
        const mutationName = (document.definitions[0] as any).selectionSet.selections[0].name.value
        return response.data.data[mutationName]
      } catch (error) {
        throw new Error(`GraphQL mutation failed: ${error}`)
      }
    },
    ...options
  })
} 