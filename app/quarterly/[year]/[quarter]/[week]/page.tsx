import { redirect } from 'next/navigation'

interface Props {
  params: {
    year: string
    quarter: string
    week: string
  }
}

export default async function QuarterlyWeekPage({ params }: Props) {
  // Nothing to render here. Just redirect to the first day of the week.
  redirect(`${params.week}/1`)
}
