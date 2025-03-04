'use client'

import { FileQuestion, Plus } from 'lucide-react'
import { useMemo } from 'react'

import { AuthGuard } from '@/components/AuthGuard'
import Dashboard from '@/components/Dashboard'
import { TableCard } from '@/components/design/TableCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TableCell, TableRow } from '@/components/ui/table'
import { GET_QUIZ_RESULTS, GET_QUIZZES } from '@/http/requests/quiz'
import { useGraphQL } from '@/http/useGraphql'
import { pluralize } from '@/lib/plurialize'

function Quizzes() {
  const { data: quizzes, isLoading: quizzesLoading } = useGraphQL(GET_QUIZZES)
  const { data: quizResults, isLoading: quizResultsLoading } = useGraphQL(GET_QUIZ_RESULTS)

  const QuizRows = useMemo(
    () => (
      <>
        {quizzes?.getQuizzes.map(quiz => (
          <TableRow key={quiz.id}>
            <TableCell>{quiz.name}</TableCell>
            <TableCell>WIP</TableCell>
          </TableRow>
        )) ?? <TableRow />}
      </>
    ),
    [quizzes]
  )

  const QuizResultsRows = useMemo(
    () => (
      <>
        {quizResults?.getQuizResults.map(quizResult => (
          <TableRow key={quizResult.id}>
            <TableCell>{quizResult.quiz.name}</TableCell>
            <TableCell>{quizResult.score}</TableCell>
            <TableCell>{new Date(quizResult.createdAt).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </>
    ),
    [quizResults]
  )

  return (
    <Dashboard
      actualState="quizzes"
      headerOptions={{
        title: 'Quizzes'
      }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold mb-6 mt-2">Quiz</h1>
        <Button size="sm" variant="outline">
          <Plus className="h-6 w-6 mr-2" />
          Créer un quiz
        </Button>
      </div>
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3 ">
        <Card>
          <CardHeader>
            <CardTitle>Quiz disponible</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={() => {}} className="flex flex-col items-center gap-4">
              <Button size="sm">Faire le quiz</Button>
            </form>
          </CardContent>
        </Card>
        <Card className={'bg-gradient-to-br from-blue-200'}>
          <CardHeader>
            <CardTitle>Nombre de quiz passés</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {quizResultsLoading ? (
              <p>Chargement...</p>
            ) : (
              <p>
                {quizResults?.getQuizResults.length} quiz
                {pluralize(quizResults?.getQuizResults.length ?? 0, '', 'zes')}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dernier quiz</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {quizResultsLoading ? (
              <p>Chargement...</p>
            ) : (
              <>
                {quizResults?.getQuizResults.length === 0 ? (
                  <p>Aucun quiz encore passés</p>
                ) : (
                  <>
                    <p>{quizResults?.getQuizResults[0].quiz.name}</p>
                    <p>{new Date(quizResults?.getQuizResults[0].createdAt).toLocaleDateString()}</p>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <TableCard
        icon={<FileQuestion />}
        title="Mes quizzes disponibles"
        headers={['Nom', 'Module']}
        isLoaded={!quizzesLoading}
        rows={QuizRows}
      />
      <TableCard
        icon={<FileQuestion />}
        title="Mes quizzes passés"
        headers={['Nom', 'Score', 'Date']}
        isLoaded={!quizResultsLoading}
        rows={QuizResultsRows}
      />
    </Dashboard>
  )
}

export default function AuthQuizzes() {
  return <AuthGuard render={Quizzes} />
}
