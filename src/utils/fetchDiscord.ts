import Discord, { Client, User } from 'discord.js';
import * as dotenv from 'dotenv'

let user: User;

const fetchDiscord = async (id: string) => {
    dotenv.config()
    const client: Client = new Discord.Client({
        intents: ["Guilds"]
    });   

    client.login(process.env.DISCORD_TOKEN)

    client.on('ready', async() => {        
        try {
            console.log("Connected to discord service");            
            user = await client.users.fetch(
                id,
                { force: true }
            )
        } catch (err) {
            console.error(err);
        }
        
    });
    return user;
}


export default fetchDiscord