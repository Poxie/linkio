import React from "react";
import { useAppSelector } from "../../redux/store"
import { selectUserDisplay } from "../../redux/user/userSelectors"

export const UserPage = () => {
    const user = useAppSelector(selectUserDisplay);

    return(
        <>
            {user?.name}
        </>
    )
}