class AdminPageView {
    private _$danceListsRadio: HTMLInputElement;
    private _$dancesRadio: HTMLInputElement;
    private _$danceTypesRadio: HTMLInputElement;

    private _$tableContainer: HTMLDivElement;
    private _$addBtn: HTMLButtonElement;
    private _$deleteBtn: HTMLButtonElement;

    public danceListsView: DanceListsTableView;
    public dancesView: DancesTableView;
    public danceTypesView: DanceTypesTableView;
    constructor() {
        this._$danceListsRadio = document.querySelector('#radio-dance-lists');
        this._$dancesRadio = document.querySelector('#radio-dances');
        this._$danceTypesRadio = document.querySelector('#radio-dance-types');

        this._$tableContainer = document.querySelector('#table-container');
        this._$addBtn = document.querySelector('#new-item-btn');
        this._$deleteBtn = document.querySelector('#delete-btn');

        this.danceListsView = new DanceListsTableView();
        this.dancesView = new DancesTableView();
        this.danceTypesView = new DanceTypesTableView();

        this._$danceListsRadio.addEventListener('click', ev => {
            this.changeTable(this.danceListsView);
        })
        this._$dancesRadio.addEventListener('click', ev => {
            this.changeTable(this.dancesView);
        })
        this._$danceTypesRadio.addEventListener('click', ev => {
            this.changeTable(this.danceTypesView);
        })
    }

    changeTable(table: TableView) {
        this._$tableContainer.innerHTML = '';
        this._$tableContainer.appendChild(table.$html);
    }


}

class TableView {
    private readonly _$html: HTMLTableElement;
    private readonly _$tbody: HTMLTableSectionElement;
    constructor(...headers: string[]) {
        let headersHTML = '';
        for (let i = 0; i < headers.length; i++) {
            headersHTML += `<th>${headers[i]}</th>`;
        }
        this._$html = document.createElement('table');
        this._$html.innerHTML =
            `<thead>
                <tr class="table-row">
                    ${headersHTML}
                </tr>
            </thead>
            <tbody></tbody>`;
        this._$html.classList.add('table');
        this._$tbody = this._$html.querySelector('tbody');
    }
    get $html(): HTMLTableElement {
        return this._$html;
    }
}

class DanceListsTableView extends TableView{
    constructor() {
        super('Название', 'Дата', 'Время', 'Описание');
    }
}

class DancesTableView extends TableView {
    constructor() {
        super('Название', 'Тип', 'Ссылка', 'Описание', 'Сложность');
    }
}


class DanceTypesTableView extends TableView {
    constructor() {
        super('Название');
    }
}

class DanceListRowView {
    private readonly _$html: HTMLTableRowElement;
    private readonly _$name: HTMLTableCellElement;
    private readonly _$date: HTMLTableCellElement;
    private readonly _$time: HTMLTableCellElement;
    private readonly _$desc: HTMLTableCellElement;
    constructor() {
        this._$html = document.createElement('tr');

        this._$name = document.createElement('td');
        this._$date = document.createElement('td');
        this._$time = document.createElement('td');
        this._$desc = document.createElement('td');

        this._$html.appendChild(this._$name);
        this._$html.appendChild(this._$date);
        this._$html.appendChild(this._$time);
        this._$html.appendChild(this._$desc);
    }
}

class DanceRowView {
    private readonly _$name: HTMLTableCellElement;
    private readonly _$type: HTMLTableCellElement;
    private readonly _$videoLink: HTMLTableCellElement;
    private readonly _$desc: HTMLTableCellElement;
    private readonly _$difficulty: HTMLTableCellElement;
    private readonly _$html: HTMLTableRowElement;
    constructor() {
        this._$name = document.createElement('td');
        this._$type = document.createElement('td');
        this._$videoLink = document.createElement('td');
        this._$desc = document.createElement('td');
        this._$difficulty = document.createElement('td');

        this._$html = document.createElement('tr');

        this._$html.appendChild(this._$name);
        this._$html.appendChild(this._$type);
        this._$html.appendChild(this._$videoLink);
        this._$html.appendChild(this._$desc);
        this._$html.appendChild(this._$difficulty);
    }
}

class DanceTypeRowView {
    private readonly _$name: HTMLTableCellElement;
    private readonly _$html: HTMLTableRowElement;
    constructor() {
        this._$name = document.createElement('td');
        this._$html = document.createElement('tr');
        this._$html.appendChild(this._$name);
    }
}

new AdminPageView();
