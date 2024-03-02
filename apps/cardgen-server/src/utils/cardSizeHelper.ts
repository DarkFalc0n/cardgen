export const discordCardSize = (query: object) => {
    let cardHeight: number,
        isStyleSimple: boolean,
        isInvalid: boolean = false
    if ('style' in query) {
        if (query.style === 'simple') {
            cardHeight = 200
            isStyleSimple = true
        } else if (query.style === 'full') {
            cardHeight = 400
            isStyleSimple = false
        } else {
            isInvalid = true
            cardHeight = 200
            isStyleSimple = true
        }
    } else {
        cardHeight = 200
        isStyleSimple = true
    }
    return {
        width: 800,
        height: cardHeight,
        isStyleSimple: isStyleSimple,
        isInvalid: isInvalid,
    }
}
