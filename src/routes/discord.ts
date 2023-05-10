import express, { Request, Response, Router } from 'express'
import { createCard } from '../utils/canvas'
import fetchDiscord from '../utils/fetchDiscord'
import { CustomUser } from '../interface/custom'

const discordCard = Router()

discordCard.get('/:id', async (req: Request, res: Response) => {
    const user = await fetchDiscord(req.params.id) as CustomUser
    const card = await createCard(
        {
            width: 600,
            height: 200,
        },
        user
    )
    res.contentType('text/html')
    res.send(`<img src="${card}" alt="image" width="300" height="100">`)
})

discordCard.get('/:id/raw', async (req: Request, res: Response) => {
    const user = await fetchDiscord(req.params.id) as CustomUser
    res.json(user)
})

export { discordCard }
