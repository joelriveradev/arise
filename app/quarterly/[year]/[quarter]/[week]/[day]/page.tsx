import { getQuarterlyLesson } from '@/actions/quarterlies'
import { ArrowLeft, Menu } from 'lucide-react'
import { Libre_Caslon_Text } from 'next/font/google'
import { Paper } from '@/components/paper'
import { Show } from '@/components/show'
import { LinkifyText } from '@/components/linkify-text'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { formatDate } from '@/lib/utils'
import { RichText } from '@/components/richtext'
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
                'relative block text-neutral-400 text-xl lg:text-base mb-6 hover:underline hover:underline-offset-2',
                {
                  'text-stone-600': currentDay && !dark,
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
      <main className='w-full lg:flex lg:items-start lg:pr-0 md:border-x'>
        <Navigation className='hidden lg:block lg:w-1/4 lg:pl-[30px] pt-10' />

        <div className='w-full h-[calc(100dvh-70px)] md:overflow-y-scroll max-w-2xl mx-auto lg:ml-0 md:border-x border-x-neutral-200 py-10 pb-14 lg:pb-10 scroll-smooth'>
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
            <Show when={!!questions?.label}>
              <p className='mb-2 antialiased font-medium'>
                <LinkifyText text={questions!.label!} />
              </p>
            </Show>

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
            <Paper lines={questions?.list.length || 0} />
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
              <h2 className='mb-5'>Further Study</h2>

              <ol>
                {egwQuotes.map(({ text }) => {
                  return <RichText text={text} />
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
