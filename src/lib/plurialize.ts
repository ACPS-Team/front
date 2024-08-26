export function pluralize(count: number, singular: string, plural: string) {
  return count < 2 ? singular : plural
}
