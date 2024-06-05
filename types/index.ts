interface BibleVerse {
  book_id: string
  book_name: string
  chapter: number
  verse: number
  text: string
}

export interface BibleAPIResponse {
  reference: string
  verses: BibleVerse[]
  text: string
  translation_id: string
  translation_name: string
  translation_note: string
}
