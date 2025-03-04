/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation LoginUser($data: LoginUserDto!) {\n    loginUser(data: $data) {\n      token\n      user {\n        id\n        email\n        firstName\n        lastName\n        birthDate\n        birthPlace\n        nationality\n        role\n      }\n    }\n  }\n": typeof types.LoginUserDocument,
    "\n  mutation RegisterUser($data: RegisterUserDto!) {\n    registerUser(data: $data) {\n      id\n    }\n  }\n": typeof types.RegisterUserDocument,
    "\n  mutation UpdatePassword($data: UpdatePasswordDto!) {\n    updatePassword(data: $data) {\n      token\n      user {\n        id\n        email\n        firstName\n        lastName\n        birthDate\n        birthPlace\n        nationality\n        role\n      }\n    }\n  }\n": typeof types.UpdatePasswordDocument,
    "\n  mutation DeleteMyAccount {\n    deleteMyAccount\n  }\n": typeof types.DeleteMyAccountDocument,
    "\n  mutation DeleteUser($id: String!) {\n    deleteUser(id: $id)\n  }\n": typeof types.DeleteUserDocument,
    "\n    query GetAllQuizzes {\n        getQuizzes {\n            id\n            name\n        }\n    }\n": typeof types.GetAllQuizzesDocument,
    "\n    query GetQuiz($id: String!) {\n        getQuiz(id: $id) {\n            id\n            name\n            # module {\n            #     id\n            #     name\n            # }\n            questions {\n                id\n                title\n                options\n            }\n        }\n    }\n": typeof types.GetQuizDocument,
    "\n    mutation CreateQuiz($data: CreateQuizDto!) {\n        createQuiz(data: $data) {\n            id\n            name\n            # module {\n            #     id\n            #     name\n            # }\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.CreateQuizDocument,
    "\n    mutation UpdateQuiz($id: String!, $data: UpdateQuizDto!) {\n        updateQuiz(id: $id, data: $data) {\n            id\n            name\n            # module {\n            #     id\n            #     name\n            # }\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.UpdateQuizDocument,
    "\n    mutation DeleteQuiz($id: String!) {\n        deleteQuiz(id: $id)\n    }\n": typeof types.DeleteQuizDocument,
    "\n    mutation CreateQuizResult($data: CreateQuizResultDto!) {\n        createQuizResult(data: $data) {\n            id\n            score\n            quiz {\n                id\n                name\n            }\n        }\n    }\n": typeof types.CreateQuizResultDocument,
    "\n    query GetQuizResults {\n        getQuizResults {\n            id\n            score\n            quiz {\n                id\n                name\n                # module {\n                #     id\n                #     name\n                # }\n            }\n            createdAt\n        }\n    }\n": typeof types.GetQuizResultsDocument,
    "\n    query GetAllReservations {\n        getAllReservations {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n": typeof types.GetAllReservationsDocument,
    "\n    query GetMyReservations {\n        getMyReservations {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n": typeof types.GetMyReservationsDocument,
    "\n    mutation CreateReservation($data: CreateReservationDto!) {\n        createReservation(data: $data) {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n": typeof types.CreateReservationDocument,
    "\n    mutation UpdateReservation($id: String!, $data: UpdateReservationDto!) {\n        updateReservation(id: $id, data: $data) {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n": typeof types.UpdateReservationDocument,
    "\n    mutation DeleteReservation($id: String!) {\n        deleteReservation(id: $id)\n    }\n": typeof types.DeleteReservationDocument,
    "\n    query GetAllResources {\n        getAllResources {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n": typeof types.GetAllResourcesDocument,
    "\n    query GetMyResources {\n        getMyResources {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n": typeof types.GetMyResourcesDocument,
    "\n    mutation CreateResource($data: CreateResourceDto!) {\n        createResource(data: $data) {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n": typeof types.CreateResourceDocument,
    "\n    mutation UpdateResource($id: String!, $data: UpdateResourceDto!) {\n        updateResource(id: $id, data: $data) {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n": typeof types.UpdateResourceDocument,
    "\n    mutation DeleteResource($id: String!) {\n        deleteResource(id: $id)\n    }\n": typeof types.DeleteResourceDocument,
};
const documents: Documents = {
    "\n  mutation LoginUser($data: LoginUserDto!) {\n    loginUser(data: $data) {\n      token\n      user {\n        id\n        email\n        firstName\n        lastName\n        birthDate\n        birthPlace\n        nationality\n        role\n      }\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation RegisterUser($data: RegisterUserDto!) {\n    registerUser(data: $data) {\n      id\n    }\n  }\n": types.RegisterUserDocument,
    "\n  mutation UpdatePassword($data: UpdatePasswordDto!) {\n    updatePassword(data: $data) {\n      token\n      user {\n        id\n        email\n        firstName\n        lastName\n        birthDate\n        birthPlace\n        nationality\n        role\n      }\n    }\n  }\n": types.UpdatePasswordDocument,
    "\n  mutation DeleteMyAccount {\n    deleteMyAccount\n  }\n": types.DeleteMyAccountDocument,
    "\n  mutation DeleteUser($id: String!) {\n    deleteUser(id: $id)\n  }\n": types.DeleteUserDocument,
    "\n    query GetAllQuizzes {\n        getQuizzes {\n            id\n            name\n        }\n    }\n": types.GetAllQuizzesDocument,
    "\n    query GetQuiz($id: String!) {\n        getQuiz(id: $id) {\n            id\n            name\n            # module {\n            #     id\n            #     name\n            # }\n            questions {\n                id\n                title\n                options\n            }\n        }\n    }\n": types.GetQuizDocument,
    "\n    mutation CreateQuiz($data: CreateQuizDto!) {\n        createQuiz(data: $data) {\n            id\n            name\n            # module {\n            #     id\n            #     name\n            # }\n            createdAt\n            updatedAt\n        }\n    }\n": types.CreateQuizDocument,
    "\n    mutation UpdateQuiz($id: String!, $data: UpdateQuizDto!) {\n        updateQuiz(id: $id, data: $data) {\n            id\n            name\n            # module {\n            #     id\n            #     name\n            # }\n            createdAt\n            updatedAt\n        }\n    }\n": types.UpdateQuizDocument,
    "\n    mutation DeleteQuiz($id: String!) {\n        deleteQuiz(id: $id)\n    }\n": types.DeleteQuizDocument,
    "\n    mutation CreateQuizResult($data: CreateQuizResultDto!) {\n        createQuizResult(data: $data) {\n            id\n            score\n            quiz {\n                id\n                name\n            }\n        }\n    }\n": types.CreateQuizResultDocument,
    "\n    query GetQuizResults {\n        getQuizResults {\n            id\n            score\n            quiz {\n                id\n                name\n                # module {\n                #     id\n                #     name\n                # }\n            }\n            createdAt\n        }\n    }\n": types.GetQuizResultsDocument,
    "\n    query GetAllReservations {\n        getAllReservations {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n": types.GetAllReservationsDocument,
    "\n    query GetMyReservations {\n        getMyReservations {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n": types.GetMyReservationsDocument,
    "\n    mutation CreateReservation($data: CreateReservationDto!) {\n        createReservation(data: $data) {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n": types.CreateReservationDocument,
    "\n    mutation UpdateReservation($id: String!, $data: UpdateReservationDto!) {\n        updateReservation(id: $id, data: $data) {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n": types.UpdateReservationDocument,
    "\n    mutation DeleteReservation($id: String!) {\n        deleteReservation(id: $id)\n    }\n": types.DeleteReservationDocument,
    "\n    query GetAllResources {\n        getAllResources {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n": types.GetAllResourcesDocument,
    "\n    query GetMyResources {\n        getMyResources {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n": types.GetMyResourcesDocument,
    "\n    mutation CreateResource($data: CreateResourceDto!) {\n        createResource(data: $data) {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n": types.CreateResourceDocument,
    "\n    mutation UpdateResource($id: String!, $data: UpdateResourceDto!) {\n        updateResource(id: $id, data: $data) {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n": types.UpdateResourceDocument,
    "\n    mutation DeleteResource($id: String!) {\n        deleteResource(id: $id)\n    }\n": types.DeleteResourceDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LoginUser($data: LoginUserDto!) {\n    loginUser(data: $data) {\n      token\n      user {\n        id\n        email\n        firstName\n        lastName\n        birthDate\n        birthPlace\n        nationality\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($data: LoginUserDto!) {\n    loginUser(data: $data) {\n      token\n      user {\n        id\n        email\n        firstName\n        lastName\n        birthDate\n        birthPlace\n        nationality\n        role\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RegisterUser($data: RegisterUserDto!) {\n    registerUser(data: $data) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUser($data: RegisterUserDto!) {\n    registerUser(data: $data) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdatePassword($data: UpdatePasswordDto!) {\n    updatePassword(data: $data) {\n      token\n      user {\n        id\n        email\n        firstName\n        lastName\n        birthDate\n        birthPlace\n        nationality\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePassword($data: UpdatePasswordDto!) {\n    updatePassword(data: $data) {\n      token\n      user {\n        id\n        email\n        firstName\n        lastName\n        birthDate\n        birthPlace\n        nationality\n        role\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteMyAccount {\n    deleteMyAccount\n  }\n"): (typeof documents)["\n  mutation DeleteMyAccount {\n    deleteMyAccount\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUser($id: String!) {\n    deleteUser(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteUser($id: String!) {\n    deleteUser(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAllQuizzes {\n        getQuizzes {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    query GetAllQuizzes {\n        getQuizzes {\n            id\n            name\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetQuiz($id: String!) {\n        getQuiz(id: $id) {\n            id\n            name\n            # module {\n            #     id\n            #     name\n            # }\n            questions {\n                id\n                title\n                options\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetQuiz($id: String!) {\n        getQuiz(id: $id) {\n            id\n            name\n            # module {\n            #     id\n            #     name\n            # }\n            questions {\n                id\n                title\n                options\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateQuiz($data: CreateQuizDto!) {\n        createQuiz(data: $data) {\n            id\n            name\n            # module {\n            #     id\n            #     name\n            # }\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation CreateQuiz($data: CreateQuizDto!) {\n        createQuiz(data: $data) {\n            id\n            name\n            # module {\n            #     id\n            #     name\n            # }\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateQuiz($id: String!, $data: UpdateQuizDto!) {\n        updateQuiz(id: $id, data: $data) {\n            id\n            name\n            # module {\n            #     id\n            #     name\n            # }\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateQuiz($id: String!, $data: UpdateQuizDto!) {\n        updateQuiz(id: $id, data: $data) {\n            id\n            name\n            # module {\n            #     id\n            #     name\n            # }\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteQuiz($id: String!) {\n        deleteQuiz(id: $id)\n    }\n"): (typeof documents)["\n    mutation DeleteQuiz($id: String!) {\n        deleteQuiz(id: $id)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateQuizResult($data: CreateQuizResultDto!) {\n        createQuizResult(data: $data) {\n            id\n            score\n            quiz {\n                id\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation CreateQuizResult($data: CreateQuizResultDto!) {\n        createQuizResult(data: $data) {\n            id\n            score\n            quiz {\n                id\n                name\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetQuizResults {\n        getQuizResults {\n            id\n            score\n            quiz {\n                id\n                name\n                # module {\n                #     id\n                #     name\n                # }\n            }\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    query GetQuizResults {\n        getQuizResults {\n            id\n            score\n            quiz {\n                id\n                name\n                # module {\n                #     id\n                #     name\n                # }\n            }\n            createdAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAllReservations {\n        getAllReservations {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    query GetAllReservations {\n        getAllReservations {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetMyReservations {\n        getMyReservations {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    query GetMyReservations {\n        getMyReservations {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateReservation($data: CreateReservationDto!) {\n        createReservation(data: $data) {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation CreateReservation($data: CreateReservationDto!) {\n        createReservation(data: $data) {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateReservation($id: String!, $data: UpdateReservationDto!) {\n        updateReservation(id: $id, data: $data) {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateReservation($id: String!, $data: UpdateReservationDto!) {\n        updateReservation(id: $id, data: $data) {\n            id\n            startDate\n            duration\n            flightDuration\n            # user {\n            #     id\n            #     name\n            # }\n            # instructor {\n            #     id\n            #     name\n            # }\n            airplane {\n                id\n                name\n            }\n            createdAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteReservation($id: String!) {\n        deleteReservation(id: $id)\n    }\n"): (typeof documents)["\n    mutation DeleteReservation($id: String!) {\n        deleteReservation(id: $id)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAllResources {\n        getAllResources {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    query GetAllResources {\n        getAllResources {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetMyResources {\n        getMyResources {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    query GetMyResources {\n        getMyResources {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateResource($data: CreateResourceDto!) {\n        createResource(data: $data) {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation CreateResource($data: CreateResourceDto!) {\n        createResource(data: $data) {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateResource($id: String!, $data: UpdateResourceDto!) {\n        updateResource(id: $id, data: $data) {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateResource($id: String!, $data: UpdateResourceDto!) {\n        updateResource(id: $id, data: $data) {\n            id\n            name\n            type\n            link\n            createdAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteResource($id: String!) {\n        deleteResource(id: $id)\n    }\n"): (typeof documents)["\n    mutation DeleteResource($id: String!) {\n        deleteResource(id: $id)\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;