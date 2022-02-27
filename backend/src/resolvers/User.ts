import { User } from "../types";
import { selectItemsByUserId } from "../utils/databaseActions";
const IMAGE_ENDPOINT = process.env.IMAGE_ENDPOINT;

export default {
    items: async (parent: User) => {
        const { id } = parent;
        const items = await selectItemsByUserId(id);
        return items;
    }
}