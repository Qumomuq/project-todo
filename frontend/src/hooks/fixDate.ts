// formatting date to Time Zone
export const fixDate = (date: string) => {
    const newDate = new Date(date)
    const timezoneOffset = newDate.getTimezoneOffset()
    const formatDate = newDate.setMinutes(newDate.getMinutes() - timezoneOffset)
    const jsonFormatDate = JSON.stringify(new Date(formatDate))
    return jsonFormatDate.slice(1, 11) + ' ' + jsonFormatDate.slice(12, 17) //YYYY-MM-DD hh:mm
}