'use client'

import React, { createContext, useContext, useCallback, useMemo, type ReactNode } from 'react'
import type {
  LoginUserMutation,
  LoginUserMutationVariables,
  RegisterUserMutation,
  RegisterUserMutationVariables,
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables,
  DeleteMyAccountMutation,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  Auth,
  UserModel
} from '../__generated__/graphql-operations'
import {
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_PASSWORD,
  DELETE_MY_ACCOUNT,
  DELETE_USER,
} from '../http/requests/auth'
import { useGraphQLMutation } from '../http/useGraphqlMutation'

interface AuthContextType {
  user: UserModel | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (variables: LoginUserMutationVariables) => Promise<Auth | undefined>
  register: (variables: RegisterUserMutationVariables) => Promise<UserModel | undefined>
  updatePassword: (variables: UpdatePasswordMutationVariables) => Promise<Auth | undefined>
  deleteAccount: () => Promise<void>
  deleteUser: (variables: DeleteUserMutationVariables) => Promise<void>
  error: Error | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const {
    mutateAsync: login,
    isPending: isLoginPending,
    data: loginData,
    error: loginError
  } = useGraphQLMutation<LoginUserMutation, LoginUserMutationVariables>(LOGIN_USER)

  const {
    mutateAsync: register,
    isPending: isRegisterPending,
    data: registerData,
    error: registerError
  } = useGraphQLMutation<RegisterUserMutation, RegisterUserMutationVariables>(REGISTER_USER)

  const {
    mutateAsync: updatePass,
    isPending: isUpdatePasswordPending,
    data: updatePasswordData,
    error: updatePasswordError
  } = useGraphQLMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UPDATE_PASSWORD)

  const {
    mutateAsync: deleteAccount,
    isPending: isDeleteAccountPending,
    error: deleteAccountError
  } = useGraphQLMutation<DeleteMyAccountMutation, Record<string, never>>(DELETE_MY_ACCOUNT)

  const {
    mutateAsync: deleteUser,
    isPending: isDeleteUserPending,
    error: deleteUserError
  } = useGraphQLMutation<DeleteUserMutation, DeleteUserMutationVariables>(DELETE_USER)

  const handleLogin = useCallback(async (variables: LoginUserMutationVariables): Promise<Auth | undefined> => {
    try {
      const result = await login(variables)
      if (result.loginUser) {
        localStorage.setItem('token', result.loginUser.token)
        return result.loginUser
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }, [login])

  const handleRegister = useCallback(async (variables: RegisterUserMutationVariables): Promise<UserModel | undefined> => {
    try {
      const result = await register(variables)
      if (result.registerUser) {
        return result.registerUser as unknown as UserModel
      }
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }, [register])

  const handleUpdatePassword = useCallback(async (variables: UpdatePasswordMutationVariables): Promise<Auth | undefined> => {
    try {
      const result = await updatePass(variables)
      return result.updatePassword
    } catch (error) {
      console.error('Password update failed:', error)
      throw error
    }
  }, [updatePass])

  const handleDeleteAccount = useCallback(async () => {
    try {
      await deleteAccount({})
      localStorage.removeItem('token')
    } catch (error) {
      console.error('Account deletion failed:', error)
      throw error
    }
  }, [deleteAccount])

  const handleDeleteUser = useCallback(async (variables: DeleteUserMutationVariables) => {
    try {
      await deleteUser(variables)
    } catch (error) {
      console.error('User deletion failed:', error)
      throw error
    }
  }, [deleteUser])

  const error = loginError || registerError || updatePasswordError || deleteAccountError || deleteUserError
  const isLoading = isLoginPending || isRegisterPending || isUpdatePasswordPending || 
                    isDeleteAccountPending || isDeleteUserPending

  const value = useMemo<AuthContextType>(() => ({
    user: loginData?.loginUser?.user || null,
    isAuthenticated: !!loginData?.loginUser?.token,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    updatePassword: handleUpdatePassword,
    deleteAccount: handleDeleteAccount,
    deleteUser: handleDeleteUser,
    error
  }), [
    loginData,
    isLoading,
    handleLogin,
    handleRegister,
    handleUpdatePassword,
    handleDeleteAccount,
    handleDeleteUser,
    error
  ])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 