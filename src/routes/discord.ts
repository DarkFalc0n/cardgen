import express, { Request, Response, Router } from 'express'
import { createCard } from '../utils/canvas'
import fetchDiscord from '../utils/fetchDiscord'
import { CustomUser } from '../interface/custom'

const discordCard = Router()

discordCard.get('/:id', async (req: Request, res: Response) => {
    const user = (await fetchDiscord(req.params.id)) as CustomUser
    const cardSize = {
        width: 800,
        height: 200,
    }
    const card = await createCard(cardSize, user)
    res.contentType('text/html')
    res.send(
        `<img src="${card}" alt="image" width="${cardSize.width / 2}" height="${
            cardSize.height / 2
        }" />`
    )
})

discordCard.get('/:id/raw', async (req: Request, res: Response) => {
    const user = (await fetchDiscord(req.params.id)) as CustomUser
    res.json(user)
})

export { discordCard }
