import 'dotenv/config'
import { User, Snowflake } from 'discord.js'
import { PresenceStore, DiscordClient } from './clientConfig'

const fetchDiscord = async (id: Snowflake) => {
    let user = await DiscordClient.users.fetch(id)
    let presence = await PresenceStore.get(user.id)
    console.log('Got user from id', {
        ...user,
        presence: JSON.parse(presence!),
    })
    return {
        ...user,
        presence,
    }
}

export default fetchDiscord
