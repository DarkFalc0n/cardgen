import { createCanvas, Canvas, loadImage } from 'canvas'
import { User } from 'discord.js'

const createCard = async (
    size: { width: number; height: number },
    user: User
) => {
    const canvas: Canvas = createCanvas(size.width, size.height)
    const context = canvas.getContext('2d')
    const bgGradient = context.createLinearGradient(
        0,
        0,
        size.width,
        size.height
    )
    bgGradient.addColorStop(0, `#8FC8EB`)
    bgGradient.addColorStop(1, '#19335A')
    context.fillStyle = bgGradient
    context.fillRect(0, 0, size.width, size.height)
    context.imageSmoothingEnabled = true
    context.fillStyle = '#ffffff'
    context.font = '40px sans-serif'
    context.fillText(user.username, 190, 112.5, 250)
    const usernameWidth = context.measureText(user.username).width
    context.fillStyle = '#bdc2ff'
    context.font = '35px sans-serif'
    context.fillText(`#${user.discriminator}`, 190 + usernameWidth + 5, 112.5)

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
    const url = canvas.toDataURL('image/jpeg')
    return url
}

export { createCard }
