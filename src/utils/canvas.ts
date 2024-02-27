import { createCanvas, Canvas, loadImage } from 'canvas'
import { CustomUser } from '../interface/custom'
import discordFlags from './discordFlags'
import { parseActivities } from './discordActivityParser'

const getFlags = async (flagBits: number) => {
    let flagBinary = flagBits.toString(2)
    let flagImageURLs = []
    for (let i = flagBinary.length - 1; i >= 0; i--) {
        if (flagBinary[i] === '1') {
            let flagURL = discordFlags.flagIcons[flagBinary.length - 1 - i]
            if (flagURL) {
                flagImageURLs.push(flagURL)
            }
        }
    }
    return flagImageURLs
}

const createCard = async (
    style: {
        width: number
        height: number
        isStyleSimple: boolean
        isInvalid: boolean
    },
    user: CustomUser
) => {
    console.log(user)
    const cornerRadius = 30
    const canvas: Canvas = createCanvas(style.width, style.height)
    const context = canvas.getContext('2d')
    const bgGradient = context.createLinearGradient(
        0,
        0,
        style.width,
        style.height
    )
    bgGradient.addColorStop(0, `#000000`)
    bgGradient.addColorStop(1, '#434343')
    context.fillStyle = bgGradient
    context.beginPath()
    context.moveTo(0 + cornerRadius, 0)
    context.arcTo(
        0 + style.width,
        0,
        0 + style.width,
        0 + style.height,
        cornerRadius
    )
    context.arcTo(
        0 + style.width,
        0 + style.height,
        0,
        0 + style.height,
        cornerRadius
    )
    context.arcTo(0, 0 + style.height, 0, 0, cornerRadius)
    context.arcTo(0, 0, 0 + style.width, 0, cornerRadius)
    context.closePath()
    context.fill()

    if (style.isInvalid) {
        context.fillStyle = '#ffffff'
        context.font = '35px consolas'
        const errorMsg = 'err: invalid/missing style query'
        const errorTextWidth = context.measureText(errorMsg)
        context.fillText(
            errorMsg,
            (style.width - errorTextWidth.width) / 2,
            112.5
        )
    } else {
        context.imageSmoothingEnabled = true
        context.fillStyle = '#ffffff'
        context.font = '35px sans-serif'
        const truncatedUsername =
            user.username.length > 19
                ? `${user.username.slice(0, 16)}...`
                : user.username
        context.fillText(truncatedUsername, 190, 112.5)
        const usernameWidth = context.measureText(truncatedUsername).width
        context.fillStyle = '#999999'
        context.font = '30px sans-serif'
        if (user.discriminator.length >= 4) {
            context.fillText(
                `#${user.discriminator}`,
                190 + usernameWidth + 5,
                112.5
            )
        }
    }
    if (user.flags?.bitfield) {
        let flags = await getFlags(user.flags.bitfield)
        for (let i = 0; i < flags.length; i++) {
            const flagImage = await loadImage(flags[i])
            context.drawImage(flagImage, 800 - 85 - i * 55, 77.5, 45, 45)
        }
    }
    const userAvatar = await loadImage(
        `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    )

    context.beginPath()
    context.arc(100, 100, 62, 0, Math.PI * 2)
    context.save()
    context.clip()
    context.arc(100, 100, 60, 0, Math.PI * 2)
    context.drawImage(userAvatar, 40, 40, 120, 120)
    context.strokeStyle = '#ffffff'
    context.lineWidth = 4
    context.stroke()
    context.restore()
    if (!style.isStyleSimple) {
        context.beginPath()
        context.moveTo(40, 200)
        context.lineTo(760, 200)
        context.strokeStyle = '#ffffff'
        context.lineWidth = 1.5
        context.closePath()
        context.stroke()
        if (user.presence) {
            let presenceObject = JSON.parse(user.presence)
            const userStatus = await loadImage(
                discordFlags.statusIcons[
                    presenceObject.status as keyof typeof discordFlags.statusIcons
                ]
            )
            context.beginPath()
            context.arc(145, 145, 20, 0, Math.PI * 2)
            context.fillStyle = '#000000'
            context.fill()
            context.drawImage(userStatus, 130, 130, 30, 30)

            if (presenceObject.activities) {
                let parsedActivities = parseActivities(
                    presenceObject.activities
                )
                if (parsedActivities.length > 0) {
                    if (parsedActivities[0].type === 'Custom Status') {
                        let customStatus = parsedActivities.shift()
                        if (customStatus?.emoji) {
                            const emoji = await loadImage(customStatus.emoji)
                            context.drawImage(emoji, 190, 127.5, 30, 30)
                        }
                        if (customStatus?.state) {
                            context.fillStyle = '#999999'
                            context.font = '25px sans-serif'
                            context.fillText(customStatus.state, 225, 152.5)
                        }
                    }
                    if (parsedActivities.length > 0) {
                        if (parsedActivities[0].largeAssetURL) {
                            const largeAsset = await loadImage(
                                parsedActivities[0].largeAssetURL
                            )
                            context.drawImage(largeAsset, 40, 240, 120, 120)
                            context.fillStyle = '#ffffff'
                            context.font = '30px sans-serif'
                            context.fillText(
                                parsedActivities[0].type +
                                    ' ' +
                                    parsedActivities[0].name,
                                200,
                                275
                            )
                            context.font = '25px sans-serif'
                            context.fillStyle = '#999999'
                            context.fillText(
                                parsedActivities[0].state + '',
                                200,
                                315
                            )
                            context.fillText(
                                parsedActivities[0].details + '',
                                200,
                                345
                            )
                        }
                        if (parsedActivities[0].smallAssetURL) {
                            const smallAsset = await loadImage(
                                parsedActivities[0].smallAssetURL
                            )
                            context.drawImage(smallAsset, 120, 320, 45, 45)
                        }
                    }
                }
            }
        }
    }

    const url = canvas.toDataURL('image/png')
    return url
}

export { createCard }
