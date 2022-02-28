import { User } from "../types";
import { selectItemsByUserId } from "../utils/databaseActions";
const IMAGE_ENDPOINT = process.env.IMAGE_ENDPOINT;

export default {
    items: async (parent: User) => {
        const { id } = parent;
        const items = await selectItemsByUserId(id);
        return items;
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