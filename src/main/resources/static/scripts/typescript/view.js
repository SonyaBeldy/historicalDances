import { DanceList } from './models/DanceList.js';
import { AdminPagePresenter } from "./admin-page-presenter.js";
import { AdminPageModel } from "./admin-page-model.js";
import { dateToCustomDateString, dateToCustomTimeString } from "./utils/date-time-converter.js";
import { DanceListView } from "./view/DanceListView.js";
export class AdminPageView {
    constructor() {
        this._$danceListsRadio = document.querySelector('#radio-dance-lists');
        this._$dancesRadio = document.querySelector('#radio-dances');
        this._$danceTypesRadio = document.querySelector('#radio-dance-types');
        //TODO убрать таблицы
        this._$tableContainer = document.querySelector('#table-container');
        this._$contentView = document.getElementById('content-view');
        this.danceListsTableView = new DanceListsTableView();
        this.dancesTableView = new DancesTableView();
        this.danceTypesTableView = new DanceTypesTableView();
        this.danceListView = new DanceListView();
        // this.list = new ObservableList<DanceList>(new DanceList(1, 'Танго', new Date(Date.now()), ''), new DanceList(2, 'Парижский вальс', new Date(Date.now()), ''));
        // this.list.addObserver(this.danceListListView);
        // // this.list.add(new DanceType(3, 'Танго'));
        // this.changeList(this.danceListListView); //TODO че тут
    }
    changeTable(table) {
        this._$tableContainer.innerHTML = '';
        this._$tableContainer.appendChild(table.$html);
    }
    bindChangeTableAction(action) {
        for (const radio of [this._$dancesRadio, this._$danceListsRadio, this._$danceTypesRadio]) {
            radio.addEventListener('change', ev => {
                action(Number(radio.value));
            });
        }
    }
    changeToListView() {
        this._$contentView.innerHTML = '';
        this._$contentView.appendChild(this.danceListView.$html);
    }
    changeToDanceView() {
        this._$contentView.innerHTML = '';
        this._$contentView.appendChild(this.dancesTableView.$html);
    }
    changeToDAnceTypeView() {
        this._$contentView.innerHTML = '';
        this._$contentView.appendChild(this.danceTypesTableView.$html);
    }
}
export class ListView {
    constructor() {
        this.$html = document.createElement('ul');
    }
}
export class DanceListListView {
    constructor() {
        this.$html = document.createElement('div');
        this.$html.classList.add('flex-column', 'gap-5');
        this.$html.innerHTML =
            `<button class="button new-dance-list-btn" id="new-item-btn">
                + Новая подборка
            </button>
            <ul class="ul"></ul>`;
        this._$ul = this.$html.querySelector('ul');
        this._$newItemBtn = this.$html.querySelector('button');
        this.items = [];
        // this.newItemBtn = document.getElementById('new-item-btn') as HTMLButtonElement;
    }
    //TODO change the way dance list updates so I don't have to reassign observers
    update(danceLists) {
        this._$ul.innerHTML = '';
        this.items = [];
        for (let i = 0; i < danceLists.length; i++) {
            let item = new DanceListListItemView();
            item.bindListItemChangeAction(this._listItemChangeAction);
            danceLists[i].addObserver(item);
            this._$ul.appendChild(item.$html);
            this.items.push(item);
        }
    }
    bindListItemChangeAction(action) {
        this._listItemChangeAction = action;
    }
    bindNewDanceListBtnAction(action) {
        this._$newItemBtn.addEventListener('click', ev => {
            action(new DanceList(-1, '', new Date(), '', []));
        });
    }
    selectListItem(danceList) {
        for (let i = 0; i < this.items.length; i++) {
            if (danceList == this.items[i].danceList) {
                this.items[i].select();
            }
        }
    }
    clearListItemAndNewItemBtnSelection() {
        this._$newItemBtn.classList.remove('new-btn-selected');
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].clearSelection();
        }
    }
    selectNewItemBtn() {
        this._$newItemBtn.classList.add('new-btn-selected');
    }
}
class DanceListListItemView {
    constructor() {
        this._$html = document.createElement('li');
        this._$html.classList.add('li', 'flex-column', 'list-item-div', 'list-item');
        this._$html.innerHTML =
            `<span class="font-size-16 weight-500 jost"></span>
             <span class="font-size-12 weight-300 jost" ></span>`;
        [this._$name, this._$date] = this._$html.querySelectorAll('span');
    }
    bindListItemChangeAction(action) {
        this._$html.addEventListener('click', ev => {
            action(this._danceList);
        });
    }
    update(danceList) {
        this._danceList = danceList;
        this._$name.textContent = danceList.name;
        this._$date.textContent = dateToCustomDateString(danceList.date);
    }
    select() {
        this.$html.classList.add('list-item-selected');
    }
    clearSelection() {
        this.$html.classList.remove('list-item-selected');
    }
    get $html() {
        return this._$html;
    }
    get danceList() {
        return this._danceList;
    }
}
class TableView {
    constructor(...headers) {
        let headersHTML = '';
        for (let i = 0; i < headers.length; i++) {
            headersHTML += `<th>${headers[i]}</th>`;
        }
        this.$html = document.createElement('table');
        this.$html.innerHTML =
            `<thead>
                <tr class="table-row">
                    ${headersHTML}
                </tr>
            </thead>
            <tbody></tbody>`;
        this.$html.classList.add('table');
        this._$tbody = this.$html.querySelector('tbody');
    }
}
class DanceListsTableView extends TableView {
    constructor() {
        super('Название', 'Дата', 'Время', 'Описание');
    }
    update(danceLists) {
        this._$tbody.innerHTML = '';
        for (let i = 0; i < danceLists.length; i++) {
            let row = new DanceListRowView();
            danceLists[i].addObserver(row);
            row.update(danceLists[i]);
            this._$tbody.appendChild(row.$html);
        }
    }
}
class DancesTableView extends TableView {
    constructor() {
        super('Название', 'Тип', 'Ссылка', 'Описание', 'Сложность');
    }
    update(dances) {
        this._$tbody.innerHTML = '';
        for (let i = 0; i < dances.length; i++) {
            let row = new DanceRowView();
            dances[i].addObserver(row);
            row.update(dances[i]);
            this._$tbody.appendChild(row.$html);
        }
    }
}
class DanceTypesTableView extends TableView {
    constructor() {
        super('Название');
    }
    update(danceTypes) {
        this._$tbody.innerHTML = '';
        for (let i = 0; i < danceTypes.length; i++) {
            let row = new DanceTypeRowView();
            danceTypes[i].addObserver(row);
            row.update(danceTypes[i]);
            this._$tbody.appendChild(row.$html);
        }
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
    update(danceList) {
        this._$name.textContent = danceList.name;
        this._$date.textContent = dateToCustomDateString(danceList.date);
        this._$time.textContent = dateToCustomTimeString(danceList.date);
        this._$desc.textContent = danceList.desc;
    }
    get $html() {
        return this._$html;
    }
}
class DanceRowView {
    constructor() {
        this._$name = document.createElement('td');
        this._$type = document.createElement('td');
        this._$videoLink = document.createElement('td');
        this._$desc = document.createElement('td');
        this._$desc.innerHTML =
            `<div>
                <textarea class="calendar jost"></textarea>
            </div>
            `;
        this._$difficulty = document.createElement('td');
        this._$html = document.createElement('tr');
        this._$html.appendChild(this._$name);
        this._$html.appendChild(this._$type);
        this._$html.appendChild(this._$videoLink);
        this._$html.appendChild(this._$desc);
        this._$html.appendChild(this._$difficulty);
    }
    update(dance) {
        this._$name.textContent = dance.name;
        this._$type.textContent = dance.danceType;
        console.log('type ' + dance.danceType);
        this._$videoLink.textContent = dance.videoLink;
        // this._$desc.textContent = dance.desc;
        this._$difficulty.textContent = dance.difficulty.toString();
    }
    get $html() {
        return this._$html;
    }
}
class DanceTypeRowView {
    constructor() {
        this._$name = document.createElement('td');
        this._$html = document.createElement('tr');
        this._$html.appendChild(this._$name);
    }
    update(danceType) {
        this._$name.textContent = danceType.name;
    }
    get $html() {
        return this._$html;
    }
}
let view = new AdminPageView();
let model = new AdminPageModel();
new AdminPagePresenter(view, model);
