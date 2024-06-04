import { getQuarterlyByYear } from '@/actions/quarterlies'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
  params: {
    year: string
    quarter: string
  }
}

export default async function QuarterlyOverviewPage({ params }: Props) {
  const { year, quarter } = params

  const { quarterlies } = await getQuarterlyByYear(
    Number(year),
    Number(quarter)
  )
  const { title, cover, introduction, weeks } = quarterlies[0]

  return (
    <main className='w-full flex items-start pt-0 md:pt-12 md:pr-8 xl:pr-0'>
      <aside className='hidden md:flex md:w-1/4 md:ml-8 xl:ml-0 mr-12'>
        <img className=' rounded-xl' src={cover.url} />
      </aside>

      <div className='w-full md:w-3/4 p-8 md:p-0'>
        <h1 className='font-semibold text-2xl md:text-3xl'>{title}</h1>

        <p className='antialised text-neutral-500 max-w-3xl my-6'>
          {introduction?.text}
        </p>

        <Button
          type='button'
          variant='outline'
          className='border-black rounded-full px-6'
        >
          Read
        </Button>

        <div className='mt-8'>
          <ol>
            {weeks.map(({ id, title, number }, i) => {
              return (
                <li key={id} className='border-t border-t-neutral-200 py-5'>
                  <Link href={`${quarter}/${number}/1`} prefetch>
                    <span className='text-lg antialiased'>
                      Week {i + 1}: <strong>{title}</strong>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </main>
  )
}
