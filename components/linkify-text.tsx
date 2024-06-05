'use client'

import { useState, Fragment, startTransition } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Show } from '@/components/show'
import { Toaster } from '@/components/ui/toaster'
import { Copy, CheckCheck } from 'lucide-react'
import { fetchBibleVerse } from '@/actions/fetch-bible-verse'

interface Props {
  text: string
}

export const LinkifyText = ({ text }: Props) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [verse, setVerse] = useState<string | null>(null)
  const [ref, setRef] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const { toast } = useToast()

  const regex =
    /\b([1-3]?\s?(?:[A-Za-z]+\.)?[A-Za-z]+\.?)\s(\d{1,3}):(\d{1,3})(?:-(\d{1,3}))?(?:,\s*(\d{1,3}))?\b/g

  const handleLinkClick = async (ref: string) => {
    const res = await fetchBibleVerse(ref)

    if ('error' in res) {
      startTransition(() => {
        setError(
          `We're sorry! Unfortunately, we couldn't find the verse you requested.`
        )
        setModalOpen(true)
      })
    }

    if ('reference' in res) {
      const { text, reference } = res

      startTransition(() => {
        setVerse(text)
        setRef(reference)
        setModalOpen(true)
      })
    }
  }

  const copyToClipboard = () => {
    if (verse && ref) {
      return navigator.clipboard.writeText(`${ref}: ${verse.trim()}`)
    }
  }

  const renderToast = async () => {
    const TIMEOUT = 5000

    if (ref) {
      await copyToClipboard()
      setCopied(true)

      toast({
        title: ref,
        description: 'This text has been copied to the clipboard!',
        duration: TIMEOUT,
      })

      setTimeout(() => {
        setCopied(false)
      }, TIMEOUT)
    }
  }

  const ParsedText = () => {
    const elements: Array<JSX.Element | string> = []
    let lastIndex = 0

    text.replace(
      regex,
      (
        match,
        book: string,
        chapter: string,
        verse: string,
        endVerse: string,
        additionalVerse: string,
        offset: number
      ) => {
        if (offset > lastIndex) {
          elements.push(
            <Fragment key={lastIndex}>
              {text.substring(lastIndex, offset)}
            </Fragment>
          )
        }

        const ref = `${book} ${chapter}:${verse}${
          endVerse ? `-${endVerse}` : ''
        }${additionalVerse ? `, ${additionalVerse}` : ''}`

        elements.push(
          <a
            href='#'
            key={offset}
            data-ref={ref}
            className='text-stone-500 underline underline-offset-4'
            onClick={(e) => {
              e.preventDefault()
              handleLinkClick(ref)
            }}
          >
            {ref}
          </a>
        )
        lastIndex = offset + match.length
        return match
      }
    )

    if (lastIndex < text.length) {
      elements.push(
        <Fragment key={lastIndex}>{text.substring(lastIndex)}</Fragment>
      )
    }

    return elements
  }

  return (
    <Fragment>
      <ParsedText />
      <Toaster />

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className='antialiased !rounded-2xl'>
          <Show when={!!verse && !error}>
            <DialogHeader>
              <p className='font-semibold'>{ref}</p>
            </DialogHeader>

            <p className='text-2xl text-neutral-600'>{verse}</p>

            <DialogFooter className='w-full !justify-start'>
              <Button className='rounded-full' onClick={renderToast}>
                <Show when={!copied}>
                  Copy <Copy size={16} className='ml-2' />
                </Show>

                <Show when={copied}>
                  Copied! <CheckCheck size={16} className='ml-2' />
                </Show>
              </Button>
            </DialogFooter>
          </Show>

          <Show when={!!error}>
            <p className='text-xl'>{error}</p>
          </Show>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
