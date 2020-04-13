import { gql } from 'apollo-server-koa'

export const testTypeDefs = gql`
  type Query {
    test: String
  }
`
