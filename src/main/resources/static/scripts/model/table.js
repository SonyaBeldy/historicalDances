class Table {
    _tableHtml;
    _headerHtml;
    _bodyHtml;
    constructor(thead, tbody) {
        this._tableHtml.appendChild(thead);
        this._tableHtml.appendChild(tbody);
    }
}

class DanceTable extends Table {
    static _instance;
    constructor() {
        if(DanceTable._instance != null) {
            return DanceTable._instance;
        }
        super();
        DanceTable._instance = this;
    }
}

class DanceListTable extends Table {
    static _instance;
    constructor() {
        if(DanceListTable._instance != null) {
            return DanceListTable._instance;
        }
        super();
        DanceListTable._instance = this;
    }
}

class DanceTypeTable extends Table {
    static _instance;
    constructor() {
        if(DanceTypeTable._instance != null) {
            return DanceTypeTable._instance;
        }
        super();
        DanceTypeTable._instance = this;
    }
}