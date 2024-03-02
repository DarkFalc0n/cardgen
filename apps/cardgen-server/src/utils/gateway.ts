import 'dotenv/config'
import { PresenceStore, discordGateway, rest } from './clientConfig'
import { GatewayDispatchEvents, Client } from '@discordjs/core'

const gatewayClient = new Client({ rest, gateway: discordGateway })

gatewayClient.on(
    GatewayDispatchEvents.GuildMemberAdd,
    async (presence: any) => {
        PresenceStore.set(presence.user.id, JSON.stringify(presence))
    }
)

gatewayClient.on(
    GatewayDispatchEvents.PresenceUpdate,
    async ({ data: presence }) => {
        console.log('Presence updated for', presence.user.username)
        PresenceStore.set(presence.user.id, JSON.stringify(presence))
    }
)

gatewayClient.once(GatewayDispatchEvents.Ready, () =>
    console.log('Connected to Discord Gateway!')
)
