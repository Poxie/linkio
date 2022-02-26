import { User } from "../types";
const IMAGE_ENDPOINT = process.env.IMAGE_ENDPOINT;

export default {
    items: async (parent: User) => {
        const { username } = parent;
        return [
            { url: 'https://twitch.tv/', content: 'Join the fun over at Twitch!', icon: `${IMAGE_ENDPOINT}/icons/twitch.png` },
            { url: 'https://youtube.com/', content: 'Not much of a stream watcher? Head over to my clip channel!', icon: `${IMAGE_ENDPOINT}/icons/youtube.png` },
            { url: 'https://snapchat.com/', content: 'You could also add me on Snapchat for a quick chat!', icon: `${IMAGE_ENDPOINT}/icons/snapchat.png` },
            { url: 'https://instagram.com/', content: 'And why not add me on Instagram as well?', icon: `${IMAGE_ENDPOINT}/icons/instagram.png` },
        ]
    }
}