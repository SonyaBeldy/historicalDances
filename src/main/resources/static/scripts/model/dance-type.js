class DanceTypeData {
    _observers = [];
    _name;
    constructor(name) {
        this._name = name;
    }

    _notify() {
        for (let i = 0; i < this._observers.length; i++) {
            this._observers[i].update(this);
        }
    }
    addObserver(observer) {
        this._observers.push(observer);
    }

    get name() {
        return this._name;
    }
}

class DanceTypeTableRow {
    _html;
    _nameHtml;

    constructor(danceTypeData) {

        danceTypeData.addObserver(this);

        this._html = document.createElement('tr');
        this._nameHtml = document.createElement('td');

        this.update(danceTypeData);

        this._html.appendChild(this._nameHtml);
    }

    update(danceTypeData) {
        this._nameHtml.textContent = danceTypeData.name;
    }

    get html() {
        return this._html;
    }
}