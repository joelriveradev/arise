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
      <aside className='hidden lg:flex lg:w-1/6 md:ml-8 lg:mr-8 xl:m-0'>
        <img className='max-w-[200px] rounded-xl' src={cover.url} />
      </aside>

      <div className='w-full md:w-3/4 p-8 md:px-0 md:pl-8 md:py-0'>
        <h1 className='font-semibold text-2xl md:text-3xl'>{title}</h1>

        <h2 className='mt-6 mb-2'>Introduction</h2>

        <p className='antialised text-neutral-500 max-w-3xl'>
          {introduction?.text}
        </p>

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
