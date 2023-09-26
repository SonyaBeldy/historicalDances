class DanceListData {

    _observers = [];
    constructor(id, name, date, desc) {
        this._id = id;
        this._name = name;
        this._date = date;
        this._desc = desc;
    }

    _update() {
        for (let i = 0; i < this._observers.length; i++) {
            this._observers[i].update(this);
        }
    }

    addObserver(observer) {
        this._observers.push(observer);
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
        this._update();
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
        this._update();
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
        this._update();
    }

    get desc() {
        return this._desc;
    }

    set desc(value) {
        this._desc = value;
        this._update();
    }
}

class DanceListTableRow { //view
// , calendarEditMenu, timeEditMenu, descEditMenu
    constructor(danceList, nameEditMenu) {
        this._danceList = danceList;
        this._danceList.addObserver(this);

        this._nameHtml = document.createElement('td');
        this._dateHtml = document.createElement('td');
        this._timeHtml = document.createElement('td');
        this._descHtml = document.createElement('td');
        this._rowHtml = document.createElement('tr');

        this.update(this._danceList);

        this._rowHtml.appendChild(this._nameHtml);
        this._rowHtml.appendChild(this._dateHtml);
        this._rowHtml.appendChild(this._timeHtml);

        this._rowHtml.appendChild(this._descHtml);
        this._nameHtml.addEventListener('dblclick', ev => {nameEditMenu.open(this._nameHtml, danceList)})
        // this._dateHtml.addEventListener('click', ev => {calendarEditMenu.open(this._dateHtml)})
        // this._timeHtml.addEventListener('click', ev => {timeEditMenu.open(this._timeHtml)})

        // this._descHtml.addEventListener('click', ev => {descEditMenu.open(this._descHtml)})
    }

    update(danceList) {
        this._nameHtml.textContent = danceList.name;
        this._dateHtml.textContent = danceList.date;
        this._timeHtml.textContent = danceList.date;
        this._descHtml.textContent = danceList.desc;
    }


    get nameHtml() {
        return this._nameHtml;
    }

    get dateHtml() {
        return this._dateHtml;
    }

    get timeHtml() {
        return this._timeHtml;
    }

    get descHtml() {
        return this._descHtml;
    }

    get rowHtml() {
        return this._rowHtml;
    }
}

class DanceListOnServer {
    constructor(danceList) {
        danceList.addObserver(this);
    }
    async update(danceList) {
        console.log('update');
        await patch('dance-lists/update', danceList);
    }
}

async function updateDanceList(danceListsJSON) {
    let resultList = [];
    for (let i = 0; i < danceListsJSON.length; i++) {
        let id = danceListsJSON[i].id;
        let name = danceListsJSON[i].name;
        let date = danceListsJSON[i].date;
        let desc = danceListsJSON[i].description;
        resultList.push(new DanceListData(id, name, date, desc));
    }
    return resultList;
}

function updateDanceListTableRows() {
    let tbody = document.getElementById('table-items');
    let nameEditMenu = new NameEditMenu();
    tbody.innerHTML = "";
    for (let i = 0; i < danceLists.length; i++) {
        let tableRow = new DanceListTableRow(danceLists[i], nameEditMenu);
        tbody.appendChild(tableRow.rowHtml);
    }
}



let danceLists = [];

async function main() {
    danceLists = await updateDanceList(await getDanceListJSON());
    updateDanceListTableRows();
    for (let i = 0; i < danceLists.length; i++) {
        new DanceListOnServer(danceLists[i]);
    }
}

main();

