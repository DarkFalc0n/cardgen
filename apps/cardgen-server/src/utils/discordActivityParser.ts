import { emojiUnicode } from './emojiParser'

interface IParsedActivity {
    type: string
    details?: string
    state?: string
    emoji?: string
    name?: string
    priority: number
    largeAssetURL?: string
    smallAssetURL?: string
}

export const parseActivities = (activities: any[]) => {
    let parsedActivities: IParsedActivity[] = []
    for (let i = 0; i < activities.length; i++) {
        const activity = activities[i]
        if (activity.type === 0) {
            let currentActivity: IParsedActivity = {
                details: activity.details,
                state: activity.state,
                name: activity.name,
                type: 'Playing',
                priority: 2,
            }
            if (activity.application_id) {
                console.log(activity.assets)
                if (activity.assets.large_image) {
                    currentActivity.largeAssetURL = `https://media.discordapp.net/${activity.assets.large_image.slice(3)}`
                }
                if (activity.assets.small_image) {
                    currentActivity.smallAssetURL = `https://media.discordapp.net/${activity.assets.small_image.slice(3)}`
                }
            }
            parsedActivities.push(currentActivity)
        } else if (activity.type === 1) {
            parsedActivities.push({
                details: activity.details,
                state: activity.state,
                name: activity.name,
                type: 'Streaming',
                priority: 1,
            })
        } else if (activity.type === 2) {
            parsedActivities.push({
                details: activity.details,
                state: activity.state,
                name: activity.name,
                type: 'Listening to',
                priority: 3,
            })
        } else if (activity.type === 3) {
            parsedActivities.push({
                details: activity.details,
                state: activity.state,
                name: activity.name,
                type: 'Watching',
                priority: 4,
            })
        } else if (activity.type === 5) {
            parsedActivities.push({
                details: activity.details,
                state: activity.state,
                name: activity.name,
                type: 'Competing in',
                priority: 5,
            })
        } else if (activity.type === 4) {
            let status: IParsedActivity = {
                state: activity.state,
                type: 'Custom Status',
                priority: 0,
            }
            if (activity.emoji.id) {
                status.emoji =
                    'https://cdn.discordapp.com/emojis/' +
                    activity.emoji.id +
                    '.png'
            } else if (activity.emoji.name) {
                let emojiCodePoint = emojiUnicode(activity.emoji.name)
                console.log(`https://emojiapi.dev/api/v1/${emojiCodePoint}.svg`)
                status.emoji = `https://emojiapi.dev/api/v1/${emojiCodePoint}.svg`
            }
            parsedActivities.push(status)
        }
    }
    parsedActivities.sort((a, b) => {
        return a.priority - b.priority
    })
    return parsedActivities
}
