import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'

interface TableCardProps {
  icon?: JSX.Element
  title: string
  headers: string[]
  rows: JSX.Element
  isLoaded?: boolean
}

export function TableCard({
  icon,
  title,
  headers,
  rows,
  isLoaded = false
}: Readonly<TableCardProps>) {
  console.log(icon, title, headers, rows, isLoaded)
  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle className="flex gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {headers.map(header => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableHeader>
          <TableBody>
            {isLoaded ? (
              rows
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length}>Chargement...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
