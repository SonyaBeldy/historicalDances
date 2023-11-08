export function dateToCustomDateString(date) {
    const dateOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };
    return date.toLocaleDateString('ru-RU', dateOptions).replace('г.', '');
}
export function inputDateToDate(inputDate, inputTime) {
    const datePattern = /(\d{4})-(\d{2})-(\d{2})/;
    const matchDate = inputDate.match(datePattern);
    if (!matchDate) {
        throw new Error('Invalid custom date-time format');
    }
    const [, year, month, day] = matchDate;
    const timePattern = /(\d{2}):(\d{2})/;
    const matchTime = inputTime.match(timePattern);
    if (!matchTime) {
        throw new Error('Invalid custom date-time format');
    }
    const [, hour, minutes] = matchTime;
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minutes));
}
export function xCalDateToDate(xCalDate, oldDate) {
    const pattern = /(\d{2}).(\d{2}).(\d{4})/;
    const match = xCalDate.match(pattern);
    if (!match) {
        throw new Error('Invalid custom date-time format');
    }
    const [, day, month, year] = match;
    //TODO номр или нет
    let newDate = new Date(oldDate);
    newDate.setFullYear(Number(year), Number(month) - 1, Number(day));
    return newDate;
}
export function customTimeToDate(oldDate, hour, minutes) {
    let newDate = new Date(oldDate);
    newDate.setHours(hour);
    newDate.setMinutes(minutes);
    return newDate;
}
export function dateToCustomTimeString(dateOnServer) {
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateOnServer).toLocaleString('ru-RU', timeOptions);
}
