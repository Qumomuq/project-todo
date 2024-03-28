export const fixDate = (date: string) => {
    return date.slice(0, 10) + ' ' + date.slice(11,16)
}