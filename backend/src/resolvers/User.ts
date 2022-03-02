import { User, UserItem } from "../types";
import { selectItemsByUserId } from "../utils/databaseActions";
const IMAGE_ENDPOINT = process.env.IMAGE_ENDPOINT;

export default {
    items: async (parent: User) => {
        const { id } = parent;
        const items = await selectItemsByUserId(id) as UserItem[];

        // Ordering item array by order property
        const sortedItems = items.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
        return sortedItems;
    },
    colorScheme: async (parent: User) => {
        // Getting properties
        const { backgroundPrimary, backgroundSecondary, bannerColor } = parent;

        // Creating scheme object
        const scheme = {
            background: {
                primary: backgroundPrimary,
                secondary: backgroundSecondary,
                banner: bannerColor
            }
        }

        return scheme;
    }
}