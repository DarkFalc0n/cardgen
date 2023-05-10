import 'dotenv/config'
import { Client, User, Snowflake } from 'discord.js'
import { PresenceStore } from './gateway'

let user: User

const client = new Client({
    intents: ['Guilds', 'GuildPresences'],
})
client.login(process.env.DISCORD_TOKEN)


client.on('ready', () => {
    console.log('Discord client is ready')
})

const fetchDiscord = async (id: Snowflake) => {
    user = await client.users.fetch(id)
    return {
        ...user,
        presence: PresenceStore.get(user.id)
    }
}

export default fetchDiscord
