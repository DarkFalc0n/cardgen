import 'dotenv/config'
import { Client, User, Snowflake } from 'discord.js'

let user: User

const client = new Client({
    intents: ['Guilds'],
})
client.login(process.env.DISCORD_TOKEN)

const fetchDiscord = async (id: Snowflake) => {
    user = await client.users.fetch(id)
    return user
}

export default fetchDiscord
