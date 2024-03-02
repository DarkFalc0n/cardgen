import express, { Application, Request, Response } from 'express'
import { discordCard } from './routes/discord'
import * as dotenv from 'dotenv'

dotenv.config()
const app: Application = express()

app.get('/api', (req: Request, res: Response) => {
    res.status(200).send('API active')
})

app.use('/api/discord', discordCard)

const port = process.env.PORT || 8800
app.listen(port, () => {
    console.log(`Card server is online at port ${port}`)
})
