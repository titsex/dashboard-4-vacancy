export const getDate = () => {
    const date = new Date()

    return [date, date.toLocaleString('ru-RU')]
}

export const generateSQL = ({ id, ...data }) => {
    let request = ''

    for (const key in data) {
        request += `${key} = '${data[key]}', `
    }

    request = request.slice(0, -2)

    return request
}
