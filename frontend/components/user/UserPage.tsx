import { User } from "../../utils/types";

export const UserPage = ({ user } : {user: User}) => {
    return(
        <>
            {user.username}
        </>
    )
}