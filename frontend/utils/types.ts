export type Item = {
    id: string;
    url: string;
    content: string;
    order: number;
    icon?: string;
    iconURL?: string;
}
export type User = {
    id: string;
    username: string;
    name: string;
    bio?: string;
    avatar?: string;
    avatarURL?: string;
    banner?: string;
    bannerURL?: string;
    items: Item[];
    colorScheme: {
        background: {
            primary?: string;
            avatar?: string;
            banner?: string;
            header?: string;
            item?: string;
        }
    }
}