import { gql } from "graphql-request";

export const USER_ITEM_PROPERTIES = `
    id
    content
    url
    order
    icon
    iconURL
`

export const USER_PROPERTIES = `
    id
    username
    name
    bio
    avatar
    avatarURL
    banner
    bannerURL
    items {
        ${USER_ITEM_PROPERTIES}
    }
    colorScheme {
        background {
            primary
            banner
            header
            item
        }
    }
`

export const GET_USER_BY_USERNAME = gql`
    query($username: String!) {
        getUserByUsername(username: $username) {
            ${USER_PROPERTIES}
        }
    }
`

export const LOGIN = gql`
    query($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`

export const GET_ME = gql`
    query {
        getMe {
            ${USER_PROPERTIES}
        }
    }
`