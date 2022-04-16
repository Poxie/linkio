import React from 'react';
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { UserPage } from "../../components/user/UserPage";
import { getMe, getUserByUsername } from "../../utils";
import { User as UserType } from "../../utils/types";

type UserProps = {
    user: UserType;
}
export default function User({ user }: UserProps) {
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
            
            <UserPage user={user} />
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