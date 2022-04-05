import { User, UserItem } from "../types";
import { selectItemsByUserId } from "../utils/databaseActions";
const IMAGE_ENDPOINT = process.env.IMAGE_ENDPOINT;

export default {
    items: async (parent: User & {includeInvisibleItems?: boolean}, args: any) => {
        // Fetching user items
        const { id, includeInvisibleItems } = parent;
        let items = await selectItemsByUserId(id, includeInvisibleItems) as UserItem[];

        // Ordering item array by order property
        const sortedItems = items.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
        return sortedItems;
    },
    colorScheme: async (parent: User) => {
        // Getting properties
        const { primaryColor, headerColor, bannerColor, itemColor, avatarColor } = parent;

        // Creating scheme object
        const scheme = {
            background: {
                primary: primaryColor,
                item: itemColor,
                header: headerColor,
                banner: bannerColor,
                avatar: avatarColor
            }
        }

        return scheme;
    }
}