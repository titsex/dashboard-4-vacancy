import { randomBytes } from 'crypto'

export const getDate = () => {
    const date = new Date()

    return [date, date.toLocaleString('ru-RU')]
}

export const getIp = (request) => request.ip || request.raw.connection.remoteAddress

export const randomString = (length) => randomBytes(length).toString('hex')

export const randomNumber = (minimum, maximum) => Math.floor(Math.random() * (maximum - minimum + 1) + minimum)

export const generateUniqueHex = () => randomString(randomNumber(10, 20))
