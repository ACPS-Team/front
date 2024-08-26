import { gql } from '@/__generated__/gql'

export const GET_QUIZZES = gql(`
    query GetAllQuizzes {
        getQuizzes {
            id
            name
        }
    }
`)

export const GET_QUIZ_BY_ID = gql(`
    query GetQuiz($id: String!) {
        getQuiz(id: $id) {
            id
            name
            # module {
            #     id
            #     name
            # }
            questions {
                id
                title
                options
            }
        }
    }
`)

export const CREATE_QUIZ = gql(`
    mutation CreateQuiz($data: CreateQuizDto!) {
        createQuiz(data: $data) {
            id
            name
            # module {
            #     id
            #     name
            # }
            createdAt
            updatedAt
        }
    }
`)

export const UPDATE_QUIZ = gql(`
    mutation UpdateQuiz($id: String!, $data: UpdateQuizDto!) {
        updateQuiz(id: $id, data: $data) {
            id
            name
            # module {
            #     id
            #     name
            # }
            createdAt
            updatedAt
        }
    }
`)

export const DELETE_QUIZ = gql(`
    mutation DeleteQuiz($id: String!) {
        deleteQuiz(id: $id)
    }
`)

export const CREATE_QUIZ_RESULT = gql(`
    mutation CreateQuizResult($data: CreateQuizResultDto!) {
        createQuizResult(data: $data) {
            id
            score
            quiz {
                id
                name
            }
        }
    }
`)

export const GET_QUIZ_RESULTS = gql(`
    query GetQuizResults {
        getQuizResults {
            id
            score
            quiz {
                id
                name
                # module {
                #     id
                #     name
                # }
            }
            createdAt
        }
    }
`)
