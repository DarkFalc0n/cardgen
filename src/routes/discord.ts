import express, { Request, Response, Router } from 'express';
import { createCard } from '../utils/canvas';
import fetchDiscord from '../utils/fetchDiscord';

const discordCard = Router();

discordCard.get('/:id', async (req: Request, res: Response) => {
    await fetchDiscord(req.params.id).then((user) => {
        const card = createCard({
            "height": 880,
            "width": 1360
        },
            user.id
        )
        res.contentType("text/html");
        res.send(`<img src="${card}" alt="image" width="340" height="220">`);
    });
})

export {
    discordCard,
}

