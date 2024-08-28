'use client'

import { AuthGuard } from '@/components/AuthGuard'
import Dashboard from '@/components/Dashboard'

function Planning() {
  return (
    <Dashboard
      actualState="planning"
      headerOptions={{
        title: 'Planning'
      }}
    >
      <p>a</p>
    </Dashboard>
  )
}

export default function AuthPlanning() {
  return <AuthGuard render={Planning} />
}
