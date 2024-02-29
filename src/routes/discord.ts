import { Request, Response, Router } from 'express'
import { createCard } from '../utils/canvas'
import fetchDiscord from '../utils/fetchDiscord'
import { CustomUser } from '../interface/custom'
import { discordCardSize } from '../utils/cardSizeHelper'
import {
    startDiscordClient,
    startDiscordGateway,
    startPresenceStore,
} from '../utils/clientConfig'

const discordCard = Router()

startDiscordClient()
startDiscordGateway()
startPresenceStore()

discordCard.get('/:id', async (req: Request, res: Response) => {
    const user = (await fetchDiscord(req.params.id)) as CustomUser

    const cardSize = discordCardSize(req.query)

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
