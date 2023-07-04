import 'dotenv/config'
import { REST } from '@discordjs/rest'
import { WebSocketManager } from '@discordjs/ws'
import {
    GatewayDispatchEvents,
    GatewayIntentBits,
    Client,
} from '@discordjs/core'
import { createClient } from 'redis'

export const PresenceStore = createClient({ url: process.env.REDIS_HOST! })
PresenceStore.connect()
PresenceStore.on('error', (err) => console.log('Redis Client Error', err))

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!)
const gateway = new WebSocketManager({
    token: process.env.DISCORD_TOKEN!,
    intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildPresences,
    rest,
})

const client = new Client({ rest, gateway })

client.on(GatewayDispatchEvents.GuildMemberAdd, async (presence: any) => {
    PresenceStore.set(presence.user.id, JSON.stringify(presence))
})

client.on(GatewayDispatchEvents.PresenceUpdate, async ({ data: presence }) => {
    PresenceStore.set(presence.user.id, JSON.stringify(presence))
})

client.once(GatewayDispatchEvents.Ready, () =>
    console.log('Connected to Discord Gateway!')
)

gateway.connect()
