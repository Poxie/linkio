import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserPage } from "../../components/user/UserPage";
import { selectMe } from "../../redux/me/meSelectors";
import { useAppSelector } from "../../redux/store";
import { setUser, setUserIsMe } from "../../redux/user/userActions";
import { selectUser } from "../../redux/user/userSelectors";
import { getUserByUsername } from "../../utils";
import { User as UserType } from "../../utils/types";

type UserProps = {
    user: UserType;
}
export default function User({ user }: UserProps) {
    const dispatch = useDispatch();
    const _user = useAppSelector(selectUser);
    const me = useAppSelector(selectMe);

    // Checking if user is owner
    useEffect(() => {
        // If user or me is undefined, return
        if(!_user || !me) return;

        // Determining if user is me
        const isMe = _user?.id === me?.id;

        // Updating isMe property based on conditions
        if(isMe && !_user?.isMe) {
            dispatch(setUserIsMe(true));
        } else if(!isMe && _user?.isMe) {
            dispatch(setUserIsMe(false));
        }
    }, [_user, me]);
    
    // On user update, update redux store
    if(user && _user?.username !== user.username) {
        dispatch(setUser(user));
    }

    const { primary, banner, avatar, header, item } = user.colorScheme.background;
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
                    ${primary && ('--user-background-primary: ' + primary)};
                    ${avatar && ('--user-avatar-background: ' + avatar)};
                    ${banner && ('--user-banner-background: ' + banner)};
                    ${header && ('--user-header-background: ' + header)};
                    ${item && ('--user-item-background: ' + item)};
                }
            `}</style>
            
            <UserPage />
        </>
    )
}

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
    const username = params?.username as string;
    const user = await getUserByUsername(username, {includeInvisibleItems: true});

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