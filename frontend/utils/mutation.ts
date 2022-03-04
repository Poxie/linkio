import { gql } from "graphql-request";
import { USER_ITEM_PROPERTIES, USER_PROPERTIES } from "./queries";

export const UPDATE_USER = gql`
    mutation($id: String!, $user: UserInput) {
        updateUser(id: $id, user: $user) {
            ${USER_PROPERTIES}
        }
    }
`

export const UPDATE_USER_ITEM = gql`
    mutation($id: String!, $content: String, $url: String, $icon: String, $order: Int) {
        updateUserItem(id: $id, content: $content, url: $url, icon: $icon, order: $order) {
            ${USER_ITEM_PROPERTIES}
        }
    }
`

export const UPDATE_USER_ITEMS = gql`
    mutation($userId: String!, $items: [UserItemInput]!) {
        setUserItems(userId: $userId, items: $items) {
            ${USER_ITEM_PROPERTIES}
        }
    }
`

export const CREATE_USER_ITEM = gql`
    mutation($userId: String!, $content: String!, $url: String!, $icon: String) {
        createUserItem(userId: $userId, content: $content, url: $url, icon: $icon) {
            ${USER_ITEM_PROPERTIES}
        }
    }
`

export const DESTROY_USER_ITEM = gql`
    mutation($id: String!) {
        destroyUserItem(id: $id)
    }
`