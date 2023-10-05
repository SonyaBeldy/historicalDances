class Table {
    _tableHtml;
    constructor(thead, tbody) {
        this._tableHtml = document.createElement('table');
        this._tableHtml.appendChild(thead.html);
        this._tableHtml.appendChild(tbody.html);
        this._tableHtml.classList.add('table');
    }

    get tableHtml() {
        return this._tableHtml;
    }
}

class DanceTable extends Table {
    static _instance;
    constructor(thead, tbody) {
        if(DanceTable._instance != null) {
            return DanceTable._instance;
        }
        super(thead, tbody);
        DanceTable._instance = this;
    }
}

class DanceListTable extends Table {
    static _instance;
    constructor(thead, tbody) {
        if(DanceListTable._instance != null) {
            return DanceListTable._instance;
        }
        super(thead, tbody);
        DanceListTable._instance = this;
    }
}

class DanceTypeTable extends Table {
    static _instance;
    constructor(thead, tbody) {
        if(DanceTypeTable._instance != null) {
            return DanceTypeTable._instance;
        }
        super(thead, tbody);
        DanceTypeTable._instance = this;
    }
}

class DanceTableBody {
    _html;
    constructor(dancesData) {
        this._html = document.createElement('tbody');
        for (let i = 0; i < dancesData.length; i++) {
            let tableRow = new DanceTableRow(dancesData[i]);
            this._html.appendChild(tableRow.rowHtml);
        }
    }
    get html() {
        return this._html;
    }
}

class DanceListTableBody {
    _html;
    constructor(danceListsData) {
        this._html = document.createElement('tbody');
        let textEditMenu = new TextEditMenu();
        let dateEditMenu = new DateEditMenu();
        let timeEditMenu = new TimeEditMenu();
        for (let i = 0; i < danceListsData.length; i++) {
            let tableRow = new DanceListTableRow(danceListsData[i], textEditMenu, dateEditMenu, timeEditMenu, textEditMenu);
            this._html.appendChild(tableRow.rowHtml);
        }
    }
    get html() {
        return this._html;
    }
}

class DanceTypesTableBody {
    _html;
    constructor(danceTypesData) {
        this._html = document.createElement('tbody');
        for (let i = 0; i < danceTypesData.length; i++) {
            let tableRow = new DanceTypeTableRow(danceTypesData[i]);
            this._html.appendChild(tableRow.html);
        }
    }

    get html() {
        return this._html;
    }
}