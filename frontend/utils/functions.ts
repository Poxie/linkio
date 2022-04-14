import { IMAGE_ENDPOINT } from "./constants"

export const getIconURL = (icon: string) => {
    return `${IMAGE_ENDPOINT}/icons/${icon}.png`
}
export const capitalizeFirstLetter = (str: string) => {
    return str.slice(0,1).toUpperCase() + str.slice(1);
}