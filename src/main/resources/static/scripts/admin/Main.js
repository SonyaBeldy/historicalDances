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
    constructor(danceList, nameEditMenu, calendarEditMenu, timeEditMenu, descEditMenu) {
        this._danceList = danceList;
        this._danceList.addObserver(this);

        this._nameHtml = document.createElement('td');
        this._dateHtml = document.createElement('td');
        this._timeHtml = document.createElement('td');
        this._descHtml = document.createElement('td');
        this._html = document.createElement('tr');

        this.update(this._danceList);

        this._html.appendChild(this._nameHtml);
        this._html.appendChild(this._dateHtml);
        this._html.appendChild(this._timeHtml);
        this._html.appendChild(this._descHtml);

        this._nameHtml.addEventListener('dblclick', ev => {nameEditMenu.open(this._nameHtml, this._danceList, 'name')})
        this._dateHtml.addEventListener('dblclick', ev => {calendarEditMenu.open(this._dateHtml, this._danceList, 'date')})
        this._timeHtml.addEventListener('dblclick', ev => {timeEditMenu.open(this._timeHtml, this._danceList, 'date')})
        this._descHtml.addEventListener('dblclick', ev => {descEditMenu.open(this._descHtml, this._danceList, 'desc')})
    }

    update(danceList) {
        this._nameHtml.textContent = danceList.name;

        this._dateHtml.textContent = DateTimeConverter.dateToCustomDateString(danceList.date);
        this._timeHtml.textContent = DateTimeConverter.dateToCustomTimeString(danceList.date);
        this._descHtml.textContent = danceList.desc;
    }
    get rowHtml() {
        return this._html;
    }
}

class DanceListOnServer {
    constructor(danceList) {
        danceList.addObserver(this);
    }
    async update(danceList) {
        //TODO why obj works and mapped is not
        await patch("dance-lists/update", Mapper.toDanceListDTOJson(danceList));
    }
}

async function updateDanceList(danceListsJSON) {
    let resultList = [];
    for (let i = 0; i < danceListsJSON.length; i++) {
        let id = danceListsJSON[i].id;
        let name = danceListsJSON[i].name;
        let date = new Date(danceListsJSON[i].date);
        let desc = danceListsJSON[i].description;
        resultList.push(new DanceListData(id, name, date, desc));
    }
    return resultList;
}

function updateDanceListTableRows() {
    let tbody = document.getElementById('table-items');
    let textEditMenu = new TextEditMenu();
    let dateEditMenu = new DateEditMenu();
    let timeEditMenu = new TimeEditMenu();
    tbody.innerHTML = "";
    for (let i = 0; i < danceListsData.length; i++) {
        let tableRow = new DanceListTableRow(danceListsData[i], textEditMenu, dateEditMenu, timeEditMenu, textEditMenu);
        tbody.appendChild(tableRow.rowHtml);
    }
}

async function updateDances(dancesJson) {
    let dancesDataList = [];
    for (let i = 0; i < dancesJson.length; i++) {
        let id = dancesJson[i].id;
        let name = dancesJson[i].name;
        let danceType = dancesJson[i].type.name;
        let videoLink = dancesJson[i].videoLink;
        let desc = dancesJson[i].description;
        let difficulty = dancesJson[i].difficulty;

        dancesDataList.push(new DanceData(id, name, danceType, videoLink, desc, difficulty));
    }
    return dancesDataList;
}
async function updateDanceTypes(danceTypesJson) {
    let danceTypesDataList = [];
    for (let i = 0; i < danceTypesJson.length; i++) {
        let name = danceTypesJson.name;

        danceTypesDataList.push(new DanceTypeData(name));
    }
    return danceTypesDataList;
}

let danceListsData = [];
let dancesData = [];
let danceTypesData = [];

async function main() {
    danceListsData = await updateDanceList(await getDanceListJSON());
    dancesData = await updateDances(await getDancesJSON());
    danceTypesData = await updateDanceTypes(await getDanceTypesJSON());

    // updateDanceListTableRows();
    // for (let i = 0; i < danceListsData.length; i++) {
    //     new DanceListOnServer(danceListsData[i]);
    // }

    let danceTable = new DanceTable(new DanceTableHeadersRow(), new DanceTableBody(dancesData));
    let danceListTable = new DanceListTable(new DanceListTableHeadersRow(), new DanceListTableBody(danceListsData));
    let danceTypeTable = new DanceTypeTable(new DanceTypeTableHeadersRow(), new DanceTypesTableBody(danceTypesData));

    let tableParentNode = document.getElementById('top-bar_table');

    danceListTable.tableHtml.style.display = 'none';
    tableParentNode.appendChild(danceListTable.tableHtml);

    danceTable.tableHtml.style.display = 'none';
    tableParentNode.appendChild(danceTable.tableHtml);

    danceTypeTable.tableHtml.style.display = 'none';
    tableParentNode.appendChild(danceTypeTable.tableHtml);


    document.getElementById('radio-dance-lists').addEventListener('change', ev => {
        console.log('dance list');
        danceListTable.tableHtml.style.display = 'table';
        danceTypeTable.tableHtml.style.display = 'none';
        danceTable.tableHtml.style.display = 'none';
    });
    document.getElementById('radio-dances').addEventListener('change', ev => {
        console.log('dance list');
        danceListTable.tableHtml.style.display = 'none';
        danceTypeTable.tableHtml.style.display = 'none';
        danceTable.tableHtml.style.display = 'table';
    });
    document.getElementById('radio-dance-types').addEventListener('change', ev => {
        console.log('dance list');
        danceTypeTable.tableHtml.style.display = 'table';
        danceListTable.tableHtml.style.display = 'none';
        danceTable.tableHtml.style.display = 'none';
    })

}

function hideAllTables() {

}

main();

