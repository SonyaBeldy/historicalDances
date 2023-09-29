class DateTimeConverter {


    static dateToCustomDateString(date) {
        const dateOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };
        return date.toLocaleDateString('ru-RU', dateOptions).replace('г.', '');
    }

    static xCalDateToDate(date, oldDate) {
        const pattern = /(\d{2}).(\d{2}).(\d{4})/;
        const match = date.match(pattern);

        if (!match) {
            throw new Error('Invalid custom date-time format');
        }
        const [, day, month, year] = match;
        //TODO номр или нет
        let newDate  = new Date(oldDate);
        newDate.setFullYear(year, month - 1, day);
        return newDate;
    }

    static changeTime(oldDate, date) {

    }

    static customTimeToDate(oldDate, hour, minutes) {
        let newDate = new Date(oldDate);
        newDate.setHours(hour);
        newDate.setMinutes(minutes);
        return newDate;
    }

    // static xCalcToCustomDate(date) {
    //     return this.dateToCustomDateString(this.xCalDateToDate(date));
    // }

    static dateToCustomTimeString(dateOnServer) {
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit'
        }
        return new Date(dateOnServer).toLocaleString('ru-RU', timeOptions);
    }


}
