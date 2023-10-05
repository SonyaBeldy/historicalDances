class AdminPageView {
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
        });
        this._$dancesRadio.addEventListener('click', ev => {
            this.changeTable(this.dancesView);
        });
        this._$danceTypesRadio.addEventListener('click', ev => {
            this.changeTable(this.danceTypesView);
        });
    }
    changeTable(table) {
        this._$tableContainer.innerHTML = '';
        this._$tableContainer.appendChild(table.$html);
    }
}
class TableView {
    constructor(...headers) {
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
    get $html() {
        return this._$html;
    }
}
class DanceListsTableView extends TableView {
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
    constructor() {
        this._$name = document.createElement('td');
        this._$html = document.createElement('tr');
        this._$html.appendChild(this._$name);
    }
}
new AdminPageView();
