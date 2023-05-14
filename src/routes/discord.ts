import { Request, Response, Router } from 'express'
import { createCard } from '../utils/canvas'
import fetchDiscord from '../utils/fetchDiscord'
import { CustomUser } from '../interface/custom'

const discordCard = Router()

discordCard.get('/:id', async (req: Request, res: Response) => {
    const user = (await fetchDiscord(req.params.id)) as CustomUser
    const cardSize = () => {
        let cardHeight: number,
            isStyleSimple: boolean,
            isInvalid: boolean = false
        if ('style' in req.query) {
            if (req.query.style === 'simple') {
                cardHeight = 200
                isStyleSimple = true
            } else if (req.query.style === 'full') {
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
    const card = await createCard(cardSize(), user)
    res.contentType('text/html')
    res.send(
        `<img src="${card}" alt="image" width="${
            cardSize().width / 2
        }" height="${cardSize().height / 2}" />`
    )
})

discordCard.get('/:id/raw', async (req: Request, res: Response) => {
    const user = (await fetchDiscord(req.params.id)) as CustomUser
    res.json(user)
})

export { discordCard }
