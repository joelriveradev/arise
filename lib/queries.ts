import { gql } from 'graphql-request'

export const GET_QUARTERLIES = gql`
  query Quarterlies {
    quarterlies {
      id
      title
      quarter
      year
      cover {
        url
      }
    }
  }
`

export const GET_QUARTERLY_BY_YEAR = gql`
  query Quarterly($year: Int!, $quarter: Int!) {
    quarterlies(where: { year: $year, quarter: $quarter }) {
      id
      title
      introduction {
        text
      }
      cover {
        url
      }
      weeks {
        id
        title
        number
        lessons {
          id
          title
        }
      }
    }
  }
`

export const GET_QUARTERLY_LESSON = gql`
  query Quarterly($year: Int!, $quarter: Int!, $week: Int!) {
    quarterlies(where: { year: $year, quarter: $quarter }) {
      id
      title
      cover {
        url
      }
      weeks(where: { number: $week }) {
        id
        title
        number
        lessons {
          id
          title
          number
          day
          questions {
            list
          }
          egwQuotes {
            id
            text {
              text
            }
          }
          notes {
            text
          }
        }
      }
    }
  }
`
