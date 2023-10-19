import {DanceList} from './models/DanceList.js';
import {Dance} from "./models/Dance.js";
import {DanceType} from "./models/DanceType.js";
import {ObservableList, Observer} from "./utils/Observer.js";
import {AdminPagePresenter} from "./admin-page-presenter.js";
import {AdminPageModel} from "./admin-page-model.js";
import {dateToCustomDateString, dateToCustomTimeString} from "./utils/date-time-converter.js";

export class AdminPageView {
    private _$danceListsRadio: HTMLInputElement;
    private _$dancesRadio: HTMLInputElement;
    private _$danceTypesRadio: HTMLInputElement;

    private _$tableContainer: HTMLDivElement;
    private _$addBtn: HTMLButtonElement;
    private _$deleteBtn: HTMLButtonElement;

    public danceListsTableView: DanceListsTableView;
    public dancesTableView: DancesTableView;
    public danceTypesTableView: DanceTypesTableView;


    //TODO DELETE
    private list: ObservableList<DanceType>;
    constructor() {
        this._$danceListsRadio = document.querySelector('#radio-dance-lists');
        this._$dancesRadio = document.querySelector('#radio-dances');
        this._$danceTypesRadio = document.querySelector('#radio-dance-types');

        this._$tableContainer = document.querySelector('#table-container');
        this._$addBtn = document.querySelector('#new-item-btn');
        this._$deleteBtn = document.querySelector('#delete-btn');

        this.danceListsTableView = new DanceListsTableView();
        this.dancesTableView = new DancesTableView();
        this.danceTypesTableView = new DanceTypesTableView();

        // this.list = new ObservableList<DanceType>(new DanceType(1, 'Вальс'), new DanceType(2, 'Полька'));
        // this.list.addObserver(this.danceTypesTableView);
        // this.list.add(new DanceType(3, 'Танго'));
    }

    changeTable(table: TableView) {
        this._$tableContainer.innerHTML = '';
        this._$tableContainer.appendChild(table.$html);
    }

    bindChangeTableAction(action: (tableType: number) => void) {
        for (const radio of [this._$dancesRadio, this._$danceListsRadio, this._$danceTypesRadio]) {
            radio.addEventListener('change', ev => {
                action(Number(radio.value));
            });
        }
    }


}

class TableView {
    protected readonly _$html: HTMLTableElement;
    protected readonly _$tbody: HTMLTableSectionElement;
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

class DanceListsTableView extends TableView implements Observer<DanceList[]> {
    constructor() {
        super('Название', 'Дата', 'Время', 'Описание');
    }

    update(danceLists: DanceList[]): void {
        this._$tbody.innerHTML = '';
        for (let i = 0; i < danceLists.length; i++) {
            let row = new DanceListRowView();
            danceLists[i].addObserver(row);
            row.update(danceLists[i]);
            this._$tbody.appendChild(row.$html);
        }
    }
}

class DancesTableView extends TableView implements Observer<Dance[]>{
    constructor() {
        super('Название', 'Тип', 'Ссылка', 'Описание', 'Сложность');
    }

    update(dances: Dance[]): void {
        this._$tbody.innerHTML = '';
        for (let i = 0; i < dances.length; i++) {
            let row = new DanceRowView();
            dances[i].addObserver(row);
            row.update(dances[i]);
            this._$tbody.appendChild(row.$html);
        }
    }
}


class DanceTypesTableView extends TableView implements Observer<DanceType[]>{
    constructor() {
        super('Название');
    }

    update(danceTypes: DanceType[]): void {
        this._$tbody.innerHTML = '';
        for (let i = 0; i < danceTypes.length; i++) {
            let row = new DanceTypeRowView();
            danceTypes[i].addObserver(row);
            row.update(danceTypes[i]);
            this._$tbody.appendChild(row.$html);
        }
    }
}

class DanceListRowView implements Observer<DanceList> {
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

    update(danceList: DanceList): void {
        this._$name.textContent = danceList.name;
        this._$date.textContent = dateToCustomDateString(danceList.date);
        this._$time.textContent = dateToCustomTimeString(danceList.date);
        this._$desc.textContent = danceList.desc;
    }

    get $html(): HTMLTableRowElement {
        return this._$html;
    }
}

class DanceRowView implements Observer<Dance> {
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

    update(dance: Dance): void {
        this._$name.textContent = dance.name;
        this._$type.textContent = dance.danceType;
        this._$videoLink.textContent = dance.videoLink;
        this._$desc.textContent = dance.desc;
        this._$difficulty.textContent = dance.difficulty.toString();
    }

    get $html(): HTMLTableRowElement {
        return this._$html;
    }
}

class DanceTypeRowView implements Observer<DanceType> {
    private readonly _$name: HTMLTableCellElement;
    private readonly _$html: HTMLTableRowElement;
    constructor() {
        this._$name = document.createElement('td');
        this._$html = document.createElement('tr');
        this._$html.appendChild(this._$name);
    }

    update(danceType: DanceType): void {
        this._$name.textContent = danceType.name;
    }

    get $html(): HTMLTableRowElement {
        return this._$html;
    }
}
new AdminPagePresenter(new AdminPageView(), new AdminPageModel());