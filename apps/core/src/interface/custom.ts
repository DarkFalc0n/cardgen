import { User } from 'discord.js'

export interface CustomUser extends User {
    presence: any
}
