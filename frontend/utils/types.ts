export type Item = {
    url: string;
    content: string;
    icon?: string;
}
export type User = {
    username: string;
    name: string;
    bio?: string;
    avatar?: string;
    avatarURL?: string;
    banner?: string;
    bannerURL?: string;
    items: Item[];
}