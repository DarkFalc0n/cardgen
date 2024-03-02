import { Client } from 'discord.js'
import { WebSocketManager } from '@discordjs/ws'
import { GatewayIntentBits } from '@discordjs/core'
import { REST } from '@discordjs/rest'
import { createClient } from 'redis'
import 'dotenv/config'

//Discord Client
export const DiscordClient = new Client({
    intents: ['Guilds', 'GuildPresences'],
})
export const startDiscordClient = async () => {
    try {
        await DiscordClient.login(process.env.DISCORD_TOKEN!)
        console.log('Connected to Discord Client')
    } catch (err) {
        console.error('Error while connecting to discord client', err)
    } finally {
        return DiscordClient
    }
}

//Presence Store Redis Client
export const PresenceStore = createClient({
    username: process.env.REDIS_USERNAME!,
    password: process.env.REDIS_PASSWORD!,
    socket: {
        host: process.env.REDIS_HOST!,
        port: Number(process.env.REDIS_PORT!),
    },
})
export const startPresenceStore = async () => {
    try {
        await PresenceStore.connect()
        console.log('Connected to Redis Host')
    } catch (err) {
        console.error('Error while connecting to presence store', err)
    } finally {
        return PresenceStore
    }
}

//Discord Gateway Client
export const rest = new REST({ version: '10' }).setToken(
    process.env.DISCORD_TOKEN!
)
export const discordGateway = new WebSocketManager({
    token: process.env.DISCORD_TOKEN!,
    intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildPresences,
    rest,
})
export const startDiscordGateway = async () => {
    try {
        await discordGateway.connect()
        console.log('Connected to Discord Gateway Client')
    } catch (err) {
        console.error('Error while connecting to gateway', err)
    } finally {
        return discordGateway
    }
}
