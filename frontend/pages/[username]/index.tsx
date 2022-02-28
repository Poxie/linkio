import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserPage } from "../../components/user/UserPage";
import { useAppSelector } from "../../redux/store";
import { setUser } from "../../redux/user/userActions";
import { selectUser } from "../../redux/user/userSelectors";
import { getUserByUsername } from "../../utils";
import { User as UserType } from "../../utils/types";

type UserProps = {
    user: UserType;
}
export default function User({ user }: UserProps) {
    const dispatch = useDispatch();
    const _user = useAppSelector(selectUser);
    
    // On user update, update redux store
    if(user && _user?.username !== user.username) {
        dispatch(setUser(user));
    }

    const { primary, secondary, banner } = user.colorScheme.background;
    return(
        <>
            <Head>
                <title>
                    {user.name}
                </title>
                <meta name="description" content={user.bio} />
            </Head>

            <style jsx global>{`
                :root {
                    ${primary && '--background-primary: ' + primary};
                    ${secondary && '--background-secondary: ' + secondary};
                    ${banner && '--background-banner: ' + banner}
                }
            `}</style>
            
            <UserPage />
        </>
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