import { UserItem } from "../types";

export const isValidItem = (content: string, url: string) => {
    return !!content && !!url;
}

export const hasValidOrderProperties = (items: UserItem[]) => {
    // Ordering order properties
    const orders = items.map(item => item.order);
    orders.sort();

    // If first index is not 0, return false
    if(orders[0] !== 0) return false;
    
    // Checking if the order is correct
    let valid = true;
    orders.reduce((previous, current) => {
        if(previous + 1 !== current) valid = false;
        return previous + 1;
    }, -1)

    return valid;
}