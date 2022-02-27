import { gql } from 'apollo-server-express';

export default gql`
    type Query {
        getUserByUsername(username: String!): User
        login(username: String!, password: String!): AuthResponse!
    }
    type Mutation {
        createUser(username: String!, password: String!): User!
        updateUser(id: String!, username: String, name: String): User!
        createUserItem(userId: String!, content: String!, url: String!): UserItem
        destroyUserItem(id: String!): Boolean
        updateUserItem(id: String!, content: String, url: String): UserItem
    }
    
    type User {
        id: ID!
        username: String!
        name: String
        bio: String
        banner: String
        bannerURL: String
        avatar: String
        avatarURL: String
        items: [UserItem]
    }
    type UserItem {
        id: String!
        userId: String!
        content: String!
        url: String!
        icon: String
    }

    type AuthResponse {
        token: String!
        userId: String!
        expiration: Int!
    }
`