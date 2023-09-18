class DanceListTable {
    _rows; //list of table rows with html elements
    table; //html table
    constructor(table) {
        this.table = table;
    }
    addRow(row) {
        this.table.appendChild(row);
    }

    getRow(id) {
        return this._rows[id];
    }
}

class tableDAO {

    async get(url) {
        await fetch(url, {
            method: 'GET'
        })
    }
    async patch(url, obj) {
        await fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })
    }

    async post(url, obj) {
        await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })
    }

    async delete(url, obj) {
        await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })
    }
}

function createElement(textContent) {
    let element = document.createElement('td');
    element.textContent = textContent;
    return element;
}

class TableRow {
    _row;
    constructor(id, name, date, desc) {
        this._row = document.createElement("tr");
        this._row.setAttribute('id', id);
        this._id = id;
        this._name = createElement(name);
        this._date = createElement(this.parseDate(date));
        this._time = createElement(this.parseTime(date));
        this._desc = createElement(desc);
        // this._status = createElement(status);

        this._row.appendChild(this._name);
        this._row.appendChild(this._date);
        this._row.appendChild(this._time);
        this._row.appendChild(this._desc);
        // this._row.appendChild(this._status);
    }

    parseDate(date) {
        const dateOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }
        let newDate = new Date(date).toLocaleString('ru-RU', dateOptions);
        newDate = newDate.replace(' г.', '');
        return newDate;
    }

    parseTime(time) {
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit'
        }
        return new Date(time).toLocaleString('ru-RU', timeOptions);

    }
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get row() {
        return this._row;
    }

    set row(value) {
        this._row = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get time() {
        return this._time;
    }

    set time(value) {
        this._time = value;
    }

    get desc() {
        return this._desc;
    }

    set desc(value) {
        this._desc = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }
}

class tableColumn {
    doubleClickAction() {

    }
}
class nameColumn extends tableColumn {
    _clickBehavior;

    get clickBehavior() {
        return this._clickBehavior;
    }

    set clickBehavior(value) {
        this._clickBehavior = value;
    }
}

class dateColumn extends tableColumn {
    doubleClickAction() {

    }
}


class timeColumn extends tableColumn {
    doubleClickAction() {
        console.log("time click")
    }
}