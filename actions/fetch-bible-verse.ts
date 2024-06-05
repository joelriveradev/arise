import { BibleAPIResponse } from '@/types'

export const fetchBibleVerse = async (ref: string) => {
  const url = `https://bible-api.com/${encodeURIComponent(ref)}?translation=kjv`
  const response = await fetch(url)
  const data: BibleAPIResponse | { error: string } = await response.json()

  return data
}
