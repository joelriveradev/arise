import { getQuarterlies } from '@/actions/quarterlies'

import Image from 'next/image'
import Link from 'next/link'

export default async function HomePage() {
  const { quarterlies } = await getQuarterlies()

  return (
    <main className='w-full h-dvh grid grid-cols-1 justify-items-center md:grid-cols-2 md:justify-items-start xl:grid-cols-3 2xl:grid-cols-4 px-8 py-12 lg:px-10 lg:border-x'>
      {quarterlies.map(({ id, title, quarter, cover, year }) => {
        return (
          <Link
            className='w-72 h-full'
            key={id}
            href={`/quarterly/${year}/${quarter}`}
            prefetch
          >
            <Image
              className='rounded-2xl'
              src={cover.url}
              blurDataURL={cover.url}
              alt={`The quarterly cover art for Q${quarter} ${year}.`}
              width={280}
              height={440}
              placeholder='blur'
              priority
            />

            <p className='truncate font-semibold antialised mt-3 text-base'>
              {title}
            </p>

            <small className='text-neutral-600'>
              Q{quarter} {year}
            </small>
          </Link>
        )
      })}
    </main>
  )
}
