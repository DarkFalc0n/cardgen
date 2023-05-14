import { createCanvas, Canvas, loadImage } from 'canvas'
import { CustomUser } from '../interface/custom'

const createCard = async (
    style: {
        width: number
        height: number
        isStyleSimple: boolean
        isInvalid: boolean
    },
    user: CustomUser
) => {
    const canvas: Canvas = createCanvas(style.width, style.height)
    const context = canvas.getContext('2d')
    const bgGradient = context.createLinearGradient(
        0,
        0,
        style.width,
        style.height
    )
    bgGradient.addColorStop(0, `#8FC8EB`)
    bgGradient.addColorStop(1, '#19335A')
    context.fillStyle = bgGradient
    context.fillRect(0, 0, style.width, style.height)

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
        context.fillStyle = '#bdc2ff'
        context.font = '30px sans-serif'
        context.fillText(
            `#${user.discriminator}`,
            190 + usernameWidth + 5,
            112.5
        )
        const userAvatar = await loadImage(
            `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        )
        context.beginPath()
        context.arc(100, 100, 62, 0, Math.PI * 2)
        context.clip()
        context.arc(100, 100, 60, 0, Math.PI * 2)
        context.drawImage(userAvatar, 40, 40, 120, 120)
        context.strokeStyle = '#ffffff'
        context.lineWidth = 4
        context.stroke()
    }
    const url = canvas.toDataURL('image/jpeg')
    return url
}

export { createCard }
