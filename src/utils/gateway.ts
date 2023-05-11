import 'dotenv/config'
import { REST } from '@discordjs/rest'
import { WebSocketManager } from '@discordjs/ws'
import {
    GatewayDispatchEvents,
    GatewayIntentBits,
    Client,
} from '@discordjs/core'

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!)
const gateway = new WebSocketManager({
    token: process.env.DISCORD_TOKEN!,
    intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildPresences,
    rest,
})

const client = new Client({ rest, gateway })

export const PresenceStore = new Map<string, any>()

client.on(GatewayDispatchEvents.GuildMemberAdd, async (presence: any) => {
    PresenceStore.set(presence.user.id, presence.activities)
})

client.on(GatewayDispatchEvents.PresenceUpdate, async ({ data: presence }) => {
    console.log(presence)
    PresenceStore.set(presence.user.id, presence)
})

client.once(GatewayDispatchEvents.Ready, () =>
    console.log('Connected to Discord Gateway!')
)

gateway.connect()
