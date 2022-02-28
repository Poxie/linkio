import { gql } from "graphql-request";

const USER_PROPERTIES = `
    username
    name
    bio
    avatar
    avatarURL
    banner
    bannerURL
    items {
        id
        url
        icon
        iconURL
        content
    }
    colorScheme {
        background {
            primary
            secondary
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