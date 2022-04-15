import Head from "next/head"
import { WEBSITE_NAME } from "../../utils/constants"
import { HomeMain } from "./HomeMain"

export const Home = () => {
    return(
        <>
            <Head>
                <title>
                    {WEBSITE_NAME}
                </title>
                <meta name="description" content="The only link you'll ever need containing all your social links." />
                <meta name="keywords" content="linking tool, bio link, links, link, social media" />
            </Head>
            <HomeMain />
        </>
    )
}