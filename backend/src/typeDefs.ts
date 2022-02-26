import { gql } from 'apollo-server-express';

export default gql`
    type Query {
        getUserByUsername: User
    }

    type User {
        username: ID!
        name: String!
    }
`