class DateTimeConverter {


    static dateToCustomDateString(date) {
        const dateOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };
        return date.toLocaleDateString('ru-RU', dateOptions).replace('г.', '');
    }

    static xCalDateToDate(date) {
        const pattern = /(\d{2}).(\d{2}).(\d{4})/;
        const match = date.match(pattern);

        if (!match) {
            throw new Error('Invalid custom date-time format');
        }
        const [, day, month, year] = match;
        return new Date(year, month - 1, day);
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
