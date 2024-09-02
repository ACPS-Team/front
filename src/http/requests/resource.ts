import { gql } from '@/__generated__/gql'

export const GET_RESOURCES = gql(`
    query GetAllResources {
        getAllResources {
            id
            name
            type
            link
            createdAt
        }
    }
`)

export const GET_MY_RESOURCES = gql(`
    query GetMyResources {
        getMyResources {
            id
            name
            type
            link
            createdAt
        }
    }
`)

export const CREATE_RESOURCE = gql(`
    mutation CreateResource($data: CreateResourceDto!) {
        createResource(data: $data) {
            id
            name
            type
            link
            createdAt
        }
    }
`)

export const UPDATE_RESOURCE = gql(`
    mutation UpdateResource($id: String!, $data: UpdateResourceDto!) {
        updateResource(id: $id, data: $data) {
            id
            name
            type
            link
            createdAt
        }
    }
`)

export const DELETE_RESOURCE = gql(`
    mutation DeleteResource($id: String!) {
        deleteResource(id: $id)
    }
`)
