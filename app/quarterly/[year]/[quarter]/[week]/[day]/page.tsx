import { getQuarterlyLesson } from '@/actions/quarterlies'
import { ArrowLeft, Menu } from 'lucide-react'
import { Libre_Caslon_Text } from 'next/font/google'
import { Show } from '@/components/show'
import { Input } from '@/components/ui/input'
import { LinkifyText } from '@/components/linkify-text'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

import Link from 'next/link'

interface Props {
  params: {
    year: string
    quarter: string
    week: string
    day: string
  }
}

const CaslonText = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['400'],
})

export default async function LessonDetailPage({ params }: Props) {
  const { year: y, quarter: q, week: w, day: d } = params

  const { lesson } = await getQuarterlyLesson({
    year: Number(y),
    quarter: Number(q),
    week: Number(w),
  })

  const weeks = lesson.weeks
  const week = weeks?.find((week) => week.number === Number(w))
  const day = week?.lessons.find((day) => day.number === Number(d))

  interface NavigationProps {
    className: string
    dark?: boolean
  }

  const Navigation = ({ className, dark }: NavigationProps) => {
    return (
      <nav className={cn(className)}>
        <Link
          className='flex items-center mb-4 text-xs hover:underline'
          href={`/quarterly/${y}/${q}`}
        >
          <ArrowLeft size={14} className='mr-1.5' /> Overview
        </Link>

        {week?.lessons.map((daily, i) => {
          const currentDay = daily.number === Number(d)

          return (
            <Link
              key={daily.id}
              href={`${daily.number}`}
              prefetch
              className={cn(
                'relative block text-neutral-400 mb-6 hover:underline hover:underline-offset-2',
                {
                  'text-black': currentDay && !dark,
                  'after:border-black': !dark,
                  'after:border-white': dark,
                  'text-white': currentDay && dark,
                  'font-medium hover:no-underline': currentDay,
                }
              )}
            >
              <span className='w-full block truncate lg:pr-5'>
                {i + 1}. {daily.title}
              </span>
            </Link>
          )
        })}
      </nav>
    )
  }

  if (day) {
    const { title, questions, notes, egwQuotes } = day

    return (
      <main className='w-full lg:flex lg:items-start lg:pr-0'>
        <Navigation className='hidden lg:block lg:w-1/4 lg:pl-8 xl:pl-0 pt-10' />

        <div className='w-full h-[calc(100dvh-70px)] lg:overflow-y-scroll max-w-2xl mx-auto lg:ml-0 lg:border-x border-x-neutral-200 py-10 pb-14 lg:pb-10'>
          <header className='antialiased'>
            <h1
              className={cn(
                'text-center text-2xl md:text-3xl lg:text-4xl',
                CaslonText.className
              )}
            >
              {title}
            </h1>

            <time
              className='block text-center mt-1.5 text-neutral-600'
              dateTime={day?.day}
            >
              {formatDate(day?.day)}
            </time>
          </header>

          <section className='mt-10 border-y border-y-neutral-200 text-nowrap p-6'>
            <ol className='overflow-x-scroll'>
              {questions!.list.map((question, i) => {
                const key = `question-${i}`

                return (
                  <li className='antialiased' key={key}>
                    {i + 1}. <LinkifyText text={question} />
                  </li>
                )
              })}
            </ol>
          </section>

          <section>
            {questions!.list.map((_, i) => {
              const key = `question-${i}`

              return (
                <div
                  key={key}
                  className='relative after:block after:absolute after:w-px after:h-full after:bg-red-100 after:left-8 after:top-0'
                >
                  <Input
                    type='text'
                    className='relative rounded-none border-b border-b-neutral-200 border-t-0 border-r-0 border-l-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-12'
                  />
                </div>
              )
            })}
          </section>

          <Show when={!!notes}>
            <section className='p-6 bg-neutral-50 antialiased text-neutral-600'>
              <h2 className='mb-5'>Notes</h2>
              <p>
                <LinkifyText text={notes?.text!} />
              </p>
            </section>
          </Show>

          <Show when={egwQuotes.length > 0}>
            <section className='p-6 antialiased text-stone-600'>
              <h2 className='mb-5'>Inspiration</h2>

              <ol>
                {egwQuotes!.map(({ id, text }) => {
                  return (
                    <li key={id} className='mb-4'>
                      <blockquote>
                        <LinkifyText text={text?.text!} />
                      </blockquote>
                    </li>
                  )
                })}
              </ol>
            </section>
          </Show>
        </div>

        <div className='hidden lg:block lg:w-1/4 h-[calc(100dvh-70px)] pt-10 pl-10'></div>

        <div className='fixed m-3 bottom-0 left-0 h-14 backdrop-blur-md bg-neutral-800/80 text-white lg:hidden rounded-xl'>
          <Drawer>
            <DrawerTrigger className='w-full flex items-center'>
              <Menu size={24} className='m-4' />
            </DrawerTrigger>

            <DrawerContent className='w-full h-3/4 bg-neutral-800 border-0'>
              <Navigation className='h-full p-10  text-white' dark />
            </DrawerContent>
          </Drawer>
        </div>
      </main>
    )
  }
}
