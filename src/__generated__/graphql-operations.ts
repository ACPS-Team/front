import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: any; output: any }
}

export type Airplane = {
  __typename?: 'Airplane'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  incidents: Array<Incident>
  maintenanceLogs: Array<Maintenance>
  name: Scalars['String']['output']
  serialNumber: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type CreateAirplaneDto = {
  name: Scalars['String']['input']
  serialNumber: Scalars['String']['input']
}

export type CreateIncidentDto = {
  airplaneId: Scalars['ID']['input']
  date: Scalars['DateTime']['input']
  description: Scalars['String']['input']
  isAnonymized?: Scalars['Boolean']['input']
  mitigation: Scalars['String']['input']
}

export type CreateMaintenanceDto = {
  airplaneId: Scalars['ID']['input']
  description: Scalars['String']['input']
  maintenanceDate: Scalars['DateTime']['input']
}

export type CreateQuizDto = {
  moduleId: Scalars['ID']['input']
  name: Scalars['String']['input']
  questions: Array<CreateQuizQuestionDto>
}

export type CreateQuizQuestionDto = {
  correctAnswer: Scalars['String']['input']
  options: Array<Scalars['String']['input']>
  title: Scalars['String']['input']
}

export type CreateQuizResultDto = {
  quizId: Scalars['ID']['input']
  score: Scalars['Int']['input']
}

export type CreateReservationDto = {
  airplaneId: Scalars['ID']['input']
  duration: Scalars['Int']['input']
  flightDuration: Scalars['Int']['input']
  instructorId: Scalars['ID']['input']
  startDate: Scalars['DateTime']['input']
}

export type CreateResourceDto = {
  link: Scalars['String']['input']
  name: Scalars['String']['input']
  type: ResourceType
  userId?: InputMaybe<Scalars['ID']['input']>
}

export type Incident = {
  __typename?: 'Incident'
  airplane: Airplane
  createdAt: Scalars['DateTime']['output']
  date: Scalars['DateTime']['output']
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  isAnonymized: Scalars['Boolean']['output']
  mitigation: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type Maintenance = {
  __typename?: 'Maintenance'
  airplane: Airplane
  createdAt: Scalars['DateTime']['output']
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  maintenanceDate: Scalars['DateTime']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  createAirplane: Airplane
  createIncident: Incident
  createMaintenance: Maintenance
  createQuiz: Quiz
  createQuizResult: QuizResult
  createReservation: Reservation
  createResource: Resource
  deleteAirplane: Scalars['Boolean']['output']
  deleteIncident: Scalars['Boolean']['output']
  deleteMaintenance: Scalars['Boolean']['output']
  deleteQuiz: Scalars['Boolean']['output']
  deleteReservation: Scalars['Boolean']['output']
  deleteResource: Scalars['Boolean']['output']
  updateAirplane: Airplane
  updateIncident: Incident
  updateMaintenance: Maintenance
  updateQuiz: Quiz
  updateReservation: Reservation
  updateResource: Resource
}

export type MutationCreateAirplaneArgs = {
  data: CreateAirplaneDto
}

export type MutationCreateIncidentArgs = {
  data: CreateIncidentDto
}

export type MutationCreateMaintenanceArgs = {
  data: CreateMaintenanceDto
}

export type MutationCreateQuizArgs = {
  data: CreateQuizDto
}

export type MutationCreateQuizResultArgs = {
  data: CreateQuizResultDto
}

export type MutationCreateReservationArgs = {
  data: CreateReservationDto
}

export type MutationCreateResourceArgs = {
  data: CreateResourceDto
}

export type MutationDeleteAirplaneArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteIncidentArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteMaintenanceArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteQuizArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteReservationArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteResourceArgs = {
  id: Scalars['String']['input']
}

export type MutationUpdateAirplaneArgs = {
  data: UpdateAirplaneDto
  id: Scalars['String']['input']
}

export type MutationUpdateIncidentArgs = {
  data: UpdateIncidentDto
  id: Scalars['String']['input']
}

export type MutationUpdateMaintenanceArgs = {
  data: UpdateMaintenanceDto
  id: Scalars['String']['input']
}

export type MutationUpdateQuizArgs = {
  data: UpdateQuizDto
  id: Scalars['String']['input']
}

export type MutationUpdateReservationArgs = {
  data: UpdateReservationDto
  id: Scalars['String']['input']
}

export type MutationUpdateResourceArgs = {
  data: UpdateResourceDto
  id: Scalars['String']['input']
}

export type Query = {
  __typename?: 'Query'
  getAirplaneById: Airplane
  getAllAirplanes: Array<Airplane>
  getAllIncidents: Array<Incident>
  getAllMaintenances: Array<Maintenance>
  getAllReservations: Array<Reservation>
  getAllResources: Array<Resource>
  getIncidentsByAirplaneId: Array<Incident>
  getMaintenancesByAirplaneId: Array<Maintenance>
  getMyReservations: Array<Reservation>
  getMyResources: Array<Resource>
  getQuiz: QuizWithQuestion
  getQuizResults: Array<QuizResult>
  getQuizzes: Array<Quiz>
}

export type QueryGetAirplaneByIdArgs = {
  id: Scalars['String']['input']
}

export type QueryGetAllReservationsArgs = {
  startDate?: InputMaybe<Scalars['DateTime']['input']>
}

export type QueryGetIncidentsByAirplaneIdArgs = {
  airplaneId: Scalars['String']['input']
}

export type QueryGetMaintenancesByAirplaneIdArgs = {
  airplaneId: Scalars['String']['input']
}

export type QueryGetMyReservationsArgs = {
  startDate?: InputMaybe<Scalars['DateTime']['input']>
}

export type QueryGetQuizArgs = {
  id: Scalars['String']['input']
}

export type Quiz = {
  __typename?: 'Quiz'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type QuizQuestion = {
  __typename?: 'QuizQuestion'
  id: Scalars['ID']['output']
  options: Array<Scalars['String']['output']>
  title: Scalars['String']['output']
}

export type QuizResult = {
  __typename?: 'QuizResult'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  quiz: Quiz
  score: Scalars['Float']['output']
}

export type QuizWithQuestion = {
  __typename?: 'QuizWithQuestion'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  questions: Array<QuizQuestion>
  updatedAt: Scalars['DateTime']['output']
}

export type Reservation = {
  __typename?: 'Reservation'
  airplane: Airplane
  createdAt: Scalars['DateTime']['output']
  duration: Scalars['Int']['output']
  finished_at: Scalars['DateTime']['output']
  flightDuration: Scalars['Int']['output']
  id: Scalars['ID']['output']
  startDate: Scalars['DateTime']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type Resource = {
  __typename?: 'Resource'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  link: Scalars['String']['output']
  name: Scalars['String']['output']
  type: ResourceType
  updatedAt: Scalars['DateTime']['output']
}

/** Type of a resource */
export enum ResourceType {
  Diploma = 'DIPLOMA',
  Document = 'DOCUMENT',
  Invoice = 'INVOICE',
  Tutorial = 'TUTORIAL'
}

export type UpdateAirplaneDto = {
  name?: InputMaybe<Scalars['String']['input']>
  serialNumber?: InputMaybe<Scalars['String']['input']>
}

export type UpdateIncidentDto = {
  date?: InputMaybe<Scalars['DateTime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  isAnonymized?: InputMaybe<Scalars['Boolean']['input']>
  mitigation?: InputMaybe<Scalars['String']['input']>
}

export type UpdateMaintenanceDto = {
  description?: InputMaybe<Scalars['String']['input']>
  maintenanceDate?: InputMaybe<Scalars['DateTime']['input']>
}

export type UpdateQuizDto = {
  name?: InputMaybe<Scalars['String']['input']>
}

export type UpdateReservationDto = {
  airplaneId?: InputMaybe<Scalars['ID']['input']>
  duration?: InputMaybe<Scalars['Int']['input']>
  flightDuration?: InputMaybe<Scalars['Int']['input']>
  instructorId?: InputMaybe<Scalars['ID']['input']>
  isFinished?: InputMaybe<Scalars['Boolean']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
}

export type UpdateResourceDto = {
  link?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<ResourceType>
  userId?: InputMaybe<Scalars['ID']['input']>
}

export type GetAllQuizzesQueryVariables = Exact<{ [key: string]: never }>

export type GetAllQuizzesQuery = {
  __typename?: 'Query'
  getQuizzes: Array<{ __typename?: 'Quiz'; id: string; name: string }>
}

export type GetQuizQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type GetQuizQuery = {
  __typename?: 'Query'
  getQuiz: {
    __typename?: 'QuizWithQuestion'
    id: string
    name: string
    questions: Array<{
      __typename?: 'QuizQuestion'
      id: string
      title: string
      options: Array<string>
    }>
  }
}

export type CreateQuizMutationVariables = Exact<{
  data: CreateQuizDto
}>

export type CreateQuizMutation = {
  __typename?: 'Mutation'
  createQuiz: { __typename?: 'Quiz'; id: string; name: string; createdAt: any; updatedAt: any }
}

export type UpdateQuizMutationVariables = Exact<{
  id: Scalars['String']['input']
  data: UpdateQuizDto
}>

export type UpdateQuizMutation = {
  __typename?: 'Mutation'
  updateQuiz: { __typename?: 'Quiz'; id: string; name: string; createdAt: any; updatedAt: any }
}

export type DeleteQuizMutationVariables = Exact<{
  id: Scalars['String']['input']
}>

export type DeleteQuizMutation = { __typename?: 'Mutation'; deleteQuiz: boolean }

export type CreateQuizResultMutationVariables = Exact<{
  data: CreateQuizResultDto
}>

export type CreateQuizResultMutation = {
  __typename?: 'Mutation'
  createQuizResult: {
    __typename?: 'QuizResult'
    id: string
    score: number
    quiz: { __typename?: 'Quiz'; id: string; name: string }
  }
}

export type GetQuizResultsQueryVariables = Exact<{ [key: string]: never }>

export type GetQuizResultsQuery = {
  __typename?: 'Query'
  getQuizResults: Array<{
    __typename?: 'QuizResult'
    id: string
    score: number
    createdAt: any
    quiz: { __typename?: 'Quiz'; id: string; name: string }
  }>
}

export type GetAllReservationsQueryVariables = Exact<{ [key: string]: never }>

export type GetAllReservationsQuery = {
  __typename?: 'Query'
  getAllReservations: Array<{
    __typename?: 'Reservation'
    id: string
    startDate: any
    duration: number
    flightDuration: number
    createdAt: any
    airplane: { __typename?: 'Airplane'; id: string; name: string }
  }>
}

export type GetMyReservationsQueryVariables = Exact<{ [key: string]: never }>

export type GetMyReservationsQuery = {
  __typename?: 'Query'
  getMyReservations: Array<{
    __typename?: 'Reservation'
    id: string
    startDate: any
    duration: number
    flightDuration: number
    createdAt: any
    airplane: { __typename?: 'Airplane'; id: string; name: string }
  }>
}

export type CreateReservationMutationVariables = Exact<{
  data: CreateReservationDto
}>

export type CreateReservationMutation = {
  __typename?: 'Mutation'
  createReservation: {
    __typename?: 'Reservation'
    id: string
    startDate: any
    duration: number
    flightDuration: number
    createdAt: any
    airplane: { __typename?: 'Airplane'; id: string; name: string }
  }
}

export type UpdateReservationMutationVariables = Exact<{
  id: Scalars['String']['input']
  data: UpdateReservationDto
}>

export type UpdateReservationMutation = {
  __typename?: 'Mutation'
  updateReservation: {
    __typename?: 'Reservation'
    id: string
    startDate: any
    duration: number
    flightDuration: number
    createdAt: any
    airplane: { __typename?: 'Airplane'; id: string; name: string }
  }
}

export type DeleteReservationMutationVariables = Exact<{
  id: Scalars['String']['input']
}>

export type DeleteReservationMutation = { __typename?: 'Mutation'; deleteReservation: boolean }

export type GetAllResourcesQueryVariables = Exact<{ [key: string]: never }>

export type GetAllResourcesQuery = {
  __typename?: 'Query'
  getAllResources: Array<{
    __typename?: 'Resource'
    id: string
    name: string
    type: ResourceType
    link: string
    createdAt: any
  }>
}

export type GetMyResourcesQueryVariables = Exact<{ [key: string]: never }>

export type GetMyResourcesQuery = {
  __typename?: 'Query'
  getMyResources: Array<{
    __typename?: 'Resource'
    id: string
    name: string
    type: ResourceType
    link: string
    createdAt: any
  }>
}

export type CreateResourceMutationVariables = Exact<{
  data: CreateResourceDto
}>

export type CreateResourceMutation = {
  __typename?: 'Mutation'
  createResource: {
    __typename?: 'Resource'
    id: string
    name: string
    type: ResourceType
    link: string
    createdAt: any
  }
}

export type UpdateResourceMutationVariables = Exact<{
  id: Scalars['String']['input']
  data: UpdateResourceDto
}>

export type UpdateResourceMutation = {
  __typename?: 'Mutation'
  updateResource: {
    __typename?: 'Resource'
    id: string
    name: string
    type: ResourceType
    link: string
    createdAt: any
  }
}

export type DeleteResourceMutationVariables = Exact<{
  id: Scalars['String']['input']
}>

export type DeleteResourceMutation = { __typename?: 'Mutation'; deleteResource: boolean }

export const GetAllQuizzesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllQuizzes' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getQuizzes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetAllQuizzesQuery, GetAllQuizzesQueryVariables>
export const GetQuizDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetQuiz' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getQuiz' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'questions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'options' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetQuizQuery, GetQuizQueryVariables>
export const CreateQuizDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateQuiz' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateQuizDto' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createQuiz' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateQuizMutation, CreateQuizMutationVariables>
export const UpdateQuizDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateQuiz' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateQuizDto' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateQuiz' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateQuizMutation, UpdateQuizMutationVariables>
export const DeleteQuizDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteQuiz' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteQuiz' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DeleteQuizMutation, DeleteQuizMutationVariables>
export const CreateQuizResultDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateQuizResult' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateQuizResultDto' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createQuizResult' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'quiz' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateQuizResultMutation, CreateQuizResultMutationVariables>
export const GetQuizResultsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetQuizResults' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getQuizResults' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'quiz' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetQuizResultsQuery, GetQuizResultsQueryVariables>
export const GetAllReservationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllReservations' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllReservations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
                { kind: 'Field', name: { kind: 'Name', value: 'flightDuration' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'airplane' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetAllReservationsQuery, GetAllReservationsQueryVariables>
export const GetMyReservationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMyReservations' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getMyReservations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
                { kind: 'Field', name: { kind: 'Name', value: 'flightDuration' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'airplane' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetMyReservationsQuery, GetMyReservationsQueryVariables>
export const CreateReservationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateReservation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateReservationDto' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createReservation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
                { kind: 'Field', name: { kind: 'Name', value: 'flightDuration' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'airplane' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateReservationMutation, CreateReservationMutationVariables>
export const UpdateReservationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateReservation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateReservationDto' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateReservation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
                { kind: 'Field', name: { kind: 'Name', value: 'flightDuration' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'airplane' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateReservationMutation, UpdateReservationMutationVariables>
export const DeleteReservationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteReservation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteReservation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DeleteReservationMutation, DeleteReservationMutationVariables>
export const GetAllResourcesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllResources' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAllResources' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'link' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetAllResourcesQuery, GetAllResourcesQueryVariables>
export const GetMyResourcesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMyResources' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getMyResources' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'link' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetMyResourcesQuery, GetMyResourcesQueryVariables>
export const CreateResourceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateResource' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateResourceDto' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createResource' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'link' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateResourceMutation, CreateResourceMutationVariables>
export const UpdateResourceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateResource' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateResourceDto' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateResource' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'link' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateResourceMutation, UpdateResourceMutationVariables>
export const DeleteResourceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteResource' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteResource' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DeleteResourceMutation, DeleteResourceMutationVariables>
