'use server'

import { request } from 'graphql-request'
import { Quarterly } from '@/lib/codegen/__generated__/graphql'
import {
  GET_QUARTERLIES,
  GET_QUARTERLY_BY_YEAR,
  GET_QUARTERLY_LESSON,
} from '@/lib/queries'

const url = process.env.HYGRAPH_API_URL!

export const getQuarterlies = async () => {
  return request<{ quarterlies: Quarterly[] }>(url, GET_QUARTERLIES)
}

export const getQuarterlyByYear = async (year: number, quarter: number) => {
  return request<{ quarterlies: Quarterly[] }>(url, GET_QUARTERLY_BY_YEAR, {
    year,
    quarter,
  })
}

export const getQuarterlyLesson = async ({
  year,
  quarter,
  week,
}: {
  year: number
  quarter: number
  week: number
}) => {
  const { quarterlies } = await request<{ quarterlies: Quarterly[] }>(
    url,
    GET_QUARTERLY_LESSON,
    {
      year,
      quarter,
      week,
    }
  )

  return {
    lesson: quarterlies.map(({ cover, weeks }) => ({ cover, weeks })).flat()[0],
  }
}
