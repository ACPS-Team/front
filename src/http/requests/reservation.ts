import { gql } from '@/__generated__/gql'

export const GET_RESERVATIONS = gql(`
    query GetAllReservations {
        getAllReservations {
            id
            startDate
            duration
            flightDuration
            # user {
            #     id
            #     name
            # }
            # instructor {
            #     id
            #     name
            # }
            airplane {
                id
                name
            }
            createdAt
        }
    }
`)

export const GET_MY_RESERVATIONS = gql(`
    query GetMyReservations {
        getMyReservations {
            id
            startDate
            duration
            flightDuration
            # user {
            #     id
            #     name
            # }
            # instructor {
            #     id
            #     name
            # }
            airplane {
                id
                name
            }
            createdAt
        }
    }
`)

export const CREATE_RESERVATION = gql(`
    mutation CreateReservation($data: CreateReservationDto!) {
        createReservation(data: $data) {
            id
            startDate
            duration
            flightDuration
            # user {
            #     id
            #     name
            # }
            # instructor {
            #     id
            #     name
            # }
            airplane {
                id
                name
            }
            createdAt
        }
    }
`)

export const UPDATE_RESERVATION = gql(`
    mutation UpdateReservation($id: String!, $data: UpdateReservationDto!) {
        updateReservation(id: $id, data: $data) {
            id
            startDate
            duration
            flightDuration
            # user {
            #     id
            #     name
            # }
            # instructor {
            #     id
            #     name
            # }
            airplane {
                id
                name
            }
            createdAt
        }
    }
`)

export const DELETE_RESERVATION = gql(`
    mutation DeleteReservation($id: String!) {
        deleteReservation(id: $id)
    }
`)
