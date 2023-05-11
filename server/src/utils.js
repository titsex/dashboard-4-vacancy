export const getDate = () => {
    const date = new Date()

    return [date, date.toLocaleString('ru-RU')]
}
