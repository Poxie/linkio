import { GetServerSidePropsContext } from "next";
import { getUserByUsername } from "../../utils";
import { User as UserType } from "../../utils/types";

type UserProps = {
    user: UserType;
}
export default function User({ user }: UserProps) {
    return(
        <div>
            {user.name}
        </div>
    )
}

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
    const username = params?.username as string;
    const user = await getUserByUsername(username);

    // If user is not found, show error page
    if(!user) {
        return {
            notFound: true
        }
    }

    return {
        props: {
           user
        }
    }
}