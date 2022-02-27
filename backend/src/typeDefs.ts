import { gql } from 'apollo-server-express';

export default gql`
    type Query {
        getUserByUsername(username: String!): User
    }
    type Mutation {
        createUser(username: String!, password: String!): User!
    }

    type Item {
        url: String!
        content: String!
        icon: String
    } 
    
    type User {
        username: ID!
        name: String!
        bio: String
        banner: String
        bannerURL: String
        avatar: String
        avatarURL: String
        items: [Item]
    }
`