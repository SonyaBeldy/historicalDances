class DanceTableHeadersRow {

    _html;

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

        this._html = document.createElement('tr');
        this._html.appendChild(this._nameHeaderHtml);
        this._html.appendChild(this._typeHeaderHtml);
        this._html.appendChild(this._videoLinkHeaderHtml);
        this._html.appendChild(this._descriptionHeaderHtml);
        this._html.appendChild(this._difficultyHeaderHtml);

        this._html.classList.add('table-row');
    }

    get html() {
        return this._html;
    }
}

class DanceListTableHeadersRow {
    _html;

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
        this._dateHeaderHtml.textContent = 'Дата';
        this._timeHeaderHtml.textContent = 'Время';
        this._descriptionHeaderHtml.textContent = 'Описание';

        this._html = document.createElement('tr');
        this._html.appendChild(this._nameHeaderHtml);
        this._html.appendChild(this._dateHeaderHtml);
        this._html.appendChild(this._timeHeaderHtml);
        this._html.appendChild(this._descriptionHeaderHtml);

        this._html.classList.add('table-row');
    }

    get html() {
        return this._html;
    }
}

class DanceTypeTableHeadersRow {
    _html;
    _nameHeaderHtml;

    constructor() {
        if(DanceListTableHeadersRow._instance != null) {
            return DanceListTableHeadersRow._instance;
        }
        DanceListTableHeadersRow._instance = this;
        this._nameHeaderHtml = document.createElement('th');

        this._nameHeaderHtml.textContent = 'Название';

        this._html = document.createElement('tr');
        this._html.appendChild(this._nameHeaderHtml);

        this._html.classList.add('table-row');

    }

    get html() {
        return this._html;
    }
}