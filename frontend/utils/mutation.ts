import { gql } from "graphql-request";
import { USER_ITEM_PROPERTIES, USER_PROPERTIES } from "./queries";

export const UPDATE_USER = gql`
    mutation($id: String!, $username: String, $name: String) {
        updateUser(id: $id, username: $username, name: $name) {
            ${USER_PROPERTIES}
        }
    }
`

export const UPDATE_USER_ITEM = gql`
    mutation($id: String!, $content: String, $url: String, $icon: String) {
        updateUserItem(id: $id, content: $content, url: $url, icon: $icon) {
            ${USER_ITEM_PROPERTIES}
        }
    }
`