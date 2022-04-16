import { UserItem } from "../types";

const regexURL = new RegExp('^(http(s?):\\/\\/)|(www.)((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$','i');
export const isValidItem = (content: string, url: string) => {
    const hasRequiredValues = !!content && !!url;
    const hasValidLink = regexURL.test(url);
    return hasRequiredValues && hasValidLink;
}

export const hasValidOrderProperties = (items: UserItem[]) => {
    // If item array is empty, return valid
    if(!items.length) return true;

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

export const reorderItems = (items: UserItem[], missingIndex: number) => {
    items.forEach(item => {
        if(item.order > missingIndex) {
            item.order--;
        }
    })
    return items;
}