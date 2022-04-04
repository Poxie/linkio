import { gql } from 'apollo-server-express';

export default gql`
    scalar Upload

    type Query {
        getUserByUsername(username: String!): User
        login(username: String!, password: String!): AuthResponse!
        getMe: User
    }
    type Mutation {
        createUser(username: String!, password: String!): User!
        updateUser(id: String!, user: UserInput): User!
        createUserItem(userId: String!, content: String!, url: String!, icon: String): UserItem
        destroyUserItem(id: String!): Boolean
        updateUserItem(id: String!, content: String, url: String, icon: String, order: Int): UserItem
        setUserItems(userId: String, items: [UserItemInput]): [UserItem]
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
        colorScheme: ColorScheme
    }
    input UserInput {
        username: String
        name: String
        bio: String
        banner: Upload
        bannerURL: String
        avatar: Upload
        avatarURL: String
        avatarColor: String
        bannerColor: String
        headerColor: String
        itemColor: String
        primaryColor: String
    }
    type UserItem {
        id: String!
        userId: String!
        content: String!
        url: String!
        order: Int!
        icon: String
        iconURL: String
    }
    input UserItemInput {
        id: String!
        content: String!
        url: String!
        order: Int!
        icon: String
        iconURL: String
    }

    type ColorScheme {
        background: ColorSchemeBackground
    }
    type ColorSchemeBackground {
        avatar: String
        banner: String
        item: String
        header: String
        primary: String
    }
    type AuthResponse {
        token: String!
        userId: String!
        expiration: Int!
    }
`