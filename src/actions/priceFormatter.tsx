export function formatPrice(priceInSEK: number) {
    return `${Math.floor(priceInSEK / 100)} SEK`;
}