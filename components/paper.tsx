'use client'

import {
  useState,
  useEffect,
  FocusEvent,
  KeyboardEvent,
  startTransition,
} from 'react'

import { Input } from '@/components/ui/input'

interface Props {
  lines: number
}

export const Paper = ({ lines }: Props) => {
  const [length, setLength] = useState(lines)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const lines = document.querySelectorAll('[data-line]')
    const line = lines[current] as HTMLInputElement
    line.focus()
  })

  const handleLineFocus = async (event: FocusEvent<HTMLInputElement>) => {
    const id = event.target.getAttribute('data-line')
    setCurrent(Number(id))
  }

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === 'Enter' && current === length - 1) {
      startTransition(() => {
        setLength(length + 1)
        setCurrent(current + 1)
      })
    }
  }

  return Array.from({ length }).map((_, i) => {
    return (
      <div
        key={i}
        className='relative after:block after:absolute after:w-px after:h-full after:bg-red-100 after:left-8 after:top-0'
      >
        <Input
          data-line={i}
          type='text'
          className='relative rounded-none border-b border-b-neutral-200 border-t-0 border-r-0 border-l-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-12'
          onFocus={handleLineFocus}
          onKeyDown={handleKeyDown}
        />
      </div>
    )
  })
}
