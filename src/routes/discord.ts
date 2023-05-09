import express, { Request, Response, Router } from 'express'
import { createCard } from '../utils/canvas'
import fetchDiscord from '../utils/fetchDiscord'

const discordCard = Router()

discordCard.get('/:id', async (req: Request, res: Response) => {
    const user = await fetchDiscord(req.params.id)
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

export { discordCard }
