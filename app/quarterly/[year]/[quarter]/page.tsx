import { getQuarterlyByYear } from '@/actions/quarterlies'
import { Libre_Caslon_Text } from 'next/font/google'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { cn } from '@/lib/utils'

import Image from 'next/image'
import Link from 'next/link'

interface Props {
  params: {
    year: string
    quarter: string
  }
}

const CaslonText = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['400'],
})

export default async function QuarterlyOverviewPage({ params }: Props) {
  const { year, quarter } = params

  const { quarterlies } = await getQuarterlyByYear(
    Number(year),
    Number(quarter)
  )
  const { title, cover, introduction, weeks } = quarterlies[0]

  return (
    <main className='w-full h-[calc(100dvh-70px)] flex items-start justify-center pt-0 md:pt-12 md:pr-8 xl:pr-0 border-x'>
      <aside className='hidden h-full md:flex md:flex-col md:items-center lg:w-1/6 md:ml-8 xl:m-0'>
        <Image
          className='max-w-[180px] rounded-2xl'
          src={cover.url}
          blurDataURL={cover.url}
          alt={`The quarterly cover art for Q${quarter} ${year}.`}
          width={180}
          height={252}
          placeholder='blur'
          priority
        />

        <p className='mt-3'>
          Q{quarter} {year}
        </p>
      </aside>

      <div className='w-full md:w-3/4 p-8 md:px-0 md:pl-10 lg:pl-12 md:py-0'>
        <h1
          className={cn(
            'font-semibold text-2xl md:text-3xl lg:text-4xl',
            CaslonText.className
          )}
        >
          {title}
        </h1>

        <h2 className='mt-6 mb-2'>Introduction</h2>

        <p className='antialised text-neutral-600 max-w-3xl'>
          {introduction?.text}
        </p>

        <div className='mt-8 border-t'>
          <Accordion type='single' collapsible>
            {weeks.map(({ id, title, number, lessons }, i) => {
              return (
                <AccordionItem value={id} key={id}>
                  <AccordionTrigger className='hover:bg-neutral-50 pr-5'>
                    <Link
                      className='px-5 pr-6 text-left truncate'
                      href={`${quarter}/${number}/1`}
                      prefetch
                    >
                      <span className='lg:text-lg antialiased font-medium'>
                        Week {i + 1}: {title}
                      </span>
                    </Link>
                  </AccordionTrigger>

                  <AccordionContent>
                    <ul>
                      {lessons.map((lesson, i) => {
                        return (
                          <li
                            key={lesson.id}
                            className='mb-4 pl-10 lg:pl-12 text-neutral-600 last:mb-1.5'
                          >
                            <Link
                              href={`${quarter}/${number}/${lesson.number}`}
                              className='hover:underline hover:underline-offset-4'
                              prefetch
                            >
                              Day {i + 1}: {lesson.title}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </div>
    </main>
  )
}
