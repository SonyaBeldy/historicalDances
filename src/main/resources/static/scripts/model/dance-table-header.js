class DanceTableHeadersRow {

    _rowHtml;

    _nameHeaderHtml;
    _typeHeaderHtml;
    _videoLinkHeaderHtml;
    _descriptionHeaderHtml;
    _difficultyHeaderHtml;

    constructor() {
        DanceTableHeadersRow._instance = this;
        this._nameHeaderHtml = document.createElement('th');
        this._typeHeaderHtml = document.createElement('th');
        this._videoLinkHeaderHtml = document.createElement('th');
        this._descriptionHeaderHtml = document.createElement('th');
        this._difficultyHeaderHtml = document.createElement('th');

        this._nameHeaderHtml.textContent = 'Название';
        this._typeHeaderHtml.textContent = 'Тип';
        this._videoLinkHeaderHtml.textContent = 'Ссылка';
        this._descriptionHeaderHtml.textContent = 'Описание';
        this._difficultyHeaderHtml.textContent = 'Сложность';

        this._rowHtml = document.createElement('tr');
        this._rowHtml.appendChild(this._nameHeaderHtml);
        this._rowHtml.appendChild(this._typeHeaderHtml);
        this._rowHtml.appendChild(this._videoLinkHeaderHtml);
        this._rowHtml.appendChild(this._descriptionHeaderHtml);
        this._rowHtml.appendChild(this._difficultyHeaderHtml);

        this._rowHtml.classList.add('table-row');
    }

    get rowHtml() {
        return this._rowHtml;
    }
}

class DanceListTableHeadersRow {
    _rowHtml;

    _nameHeaderHtml;
    _dateHeaderHtml;
    _timeHeaderHtml;
    _descriptionHeaderHtml;

    constructor() {
        this._nameHeaderHtml = document.createElement('th');
        this._dateHeaderHtml = document.createElement('th');
        this._timeHeaderHtml = document.createElement('th');
        this._descriptionHeaderHtml = document.createElement('th');

        this._nameHeaderHtml.textContent = 'Название';
        this._dateHeaderHtml.textContent = 'Тип';
        this._timeHeaderHtml.textContent = 'Ссылка';
        this._descriptionHeaderHtml.textContent = 'Описание';

        this._rowHtml = document.createElement('tr');
        this._rowHtml.appendChild(this._nameHeaderHtml);
        this._rowHtml.appendChild(this._dateHeaderHtml);
        this._rowHtml.appendChild(this._timeHeaderHtml);
        this._rowHtml.appendChild(this._descriptionHeaderHtml);

        this._rowHtml.classList.add('table-row');
    }

    get rowHtml() {
        return this._rowHtml;
    }
}

class DanceTypeTableHeadersRow {
    _rowHtml;
    _nameHeaderHtml;

    constructor() {
        if(DanceListTableHeadersRow._instance != null) {
            return DanceListTableHeadersRow._instance;
        }
        DanceListTableHeadersRow._instance = this;
        this._nameHeaderHtml = document.createElement('th');

        this._nameHeaderHtml.textContent = 'Название';

        this._rowHtml = document.createElement('tr');
        this._rowHtml.appendChild(this._nameHeaderHtml);

        this._rowHtml.classList.add('table-row');

    }

    get rowHtml() {
        return this._rowHtml;
    }
}