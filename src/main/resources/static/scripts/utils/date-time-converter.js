class DateTimeConverter {


    parseToSimpleDateFromServer(dateOnServer) {
        let simpleDate = new Date(dateOnServer);
        const dateOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };
        return simpleDate.toLocaleDateString('ru-RU', dateOptions).replace('г.', '');
    }

    parseToSimpleDateFromCalendar(date) {
        const pattern = /(\d{2}).(\d{2}).(\d{4})/;
        const match = date.match(pattern);

        if (!match) {
            throw new Error('Invalid custom date-time format');
        }
        const [, day, month, year] = match;
        const dateOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };
        let parsedDate = new Date(year, month - 1, day).toLocaleDateString("ru-RU", dateOptions);
        parsedDate = parsedDate.replace(' г.', '');
        return parsedDate;
    }

    parseToSimpleTimeFromServer(dateOnServer) {
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit'
        }
        return new Date(dateOnServer).toLocaleString('ru-RU', timeOptions);
    }


}
