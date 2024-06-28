import { Fragment } from 'react'

import {
  Maybe,
  RichText as RichTextType,
} from '@/lib/codegen/__generated__/graphql'

interface Props {
  text: Maybe<RichTextType> | undefined
}

export const RichText = ({ text }: Props) => {
  if (!text) return null

  const cleaned = text.text.trim().replace(/\\n/g, '\n').split('\n')

  return cleaned.map((part, index) => {
    return (
      <Fragment key={index}>
        {part}
        <br />
        <br />
      </Fragment>
    )
  })
}
