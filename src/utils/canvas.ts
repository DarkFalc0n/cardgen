import { createCanvas, Canvas } from "canvas";

const createCard = (size: {height: number, width: number}, text: string) => {

    const canvas: Canvas = createCanvas(size.width, size.height)
    const context = canvas.getContext("2d")
    context.imageSmoothingEnabled = true;
    context.fillStyle = "red"
    context.font = "192px sans-serif"
    context.fillText(text, 0, 400)
    const url = canvas.toDataURL('image/jpeg')
    return url;
}

export {
    createCard
}