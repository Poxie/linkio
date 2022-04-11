import { IMAGE_ENDPOINT } from "./constants"

export const getIconURL = (icon: string) => {
    return `${IMAGE_ENDPOINT}/icons/${icon}.png`
}