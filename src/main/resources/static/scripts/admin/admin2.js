setCheckedTab();
showCheckedTable();
let rows = new Map();
function setCheckedTab() {
    if(sessionStorage.getItem('data')) {
        document.getElementById(sessionStorage.getItem('data')).checked = true;
    } else {
        document.getElementById("radio-dance-lists").checked = true;
        sessionStorage.setItem("data", "radio-dance-lists");
    }


}
async function showCheckedTable() {
    if(document.getElementById("radio-dance-lists").checked) {
        await fillTable(await getItemList("dance-lists"));
    }
}


async function getItemList(url) {
    return await fetch("http://localhost:8080/" + url, {method: "GET"});
}
class EditMenu {
    _id;
    _menu;
    constructor(menu) {
        this._menu = menu;
    }
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get menu() {
        return this._menu;
    }

    set menu(value) {
        this._menu = value;
    }
}
let nameEditMenu = new EditMenu(document.getElementById('edit-menu'));
let timeEditMenu = new EditMenu(document.getElementById('time-edit-menu'));
async function fillTable(listValues) {
    let listArray= (await listValues.json());
    for (let i = 0; i < listArray.length; i++) {
        let id = listArray[i].id;
        let name = listArray[i].name;
        let date = listArray[i].date;
        let desc = listArray[i].description;

        let tableRow = new TableRow(id, name, date, desc);


        let listContainer = document.getElementById("table-items");
        rows.set(tableRow.id, tableRow);
        tableRow.name.addEventListener('dblclick', nameDoubleClick);
        tableRow.date.addEventListener('dblclick', dateDoubleClick);
        tableRow.time.addEventListener('dblclick', timeDoubleClick);
        listContainer.appendChild(tableRow.row);


    }

    // name edit menu buttons
    document.getElementById('cancel').addEventListener("click", ev1 => {
        nameEditMenu.menu.style.display = "none";
    })
    document.getElementById('submit').addEventListener('click', async ev1 => {
        let newName = document.getElementById("textarea").value;
        let curRow = rows.get(nameEditMenu.id);
        let obj = {id: nameEditMenu.id, name: newName, date: parseCustomDateTime(curRow.date.textContent, curRow.time.textContent), desc: 'desc'};
        patch(obj, "dance-lists/update");
        nameEditMenu.menu.style.display = "none";
        curRow.name.textContent = newName;
    })

    // time edit menu buttons
    document.getElementById('time-close-btn').addEventListener('click', ev => {
        timeEditMenu.menu.style.display = 'none';
    })

    document.getElementById('time-submit-btn').addEventListener('click', ev => {
        let row = rows.get(Number(timeEditMenu.id));

        let hours = document.getElementById('hour-select');
        let minutes = document.getElementById('minutes-select');

        const timeOptions = {
            hours: '2-digit',
            minutes: '2-digit',
        };

        row.time.textContent = hours.value + ":" + minutes.value;
        timeEditMenu.menu.style.display = 'none';

        let obj = {id: row.id, name:row.name.textContent, date: parseCustomDateTime(row.date.textContent, row.time.textContent), desc: 'desc'};

        patch(obj, 'dance-lists/update');
        // row.time.textContent =
        // let parsedTime = new Date().toLocaleDateString("ru-RU", timeOptions);
    })


    window.addEventListener("resize", ev => {
        if(nameEditMenu.id != null) {
            updateMenuPosition(document.getElementById("edit-menu"),  document.getElementById(nameEditMenu.id));
        }
    });

}

function nameDoubleClick(event) {
    let menu = document.getElementById("edit-menu");
    menu.style.display = "flex";
    updateMenuPosition(nameEditMenu.menu, event.target);

    let nameElement = event.target;
    nameEditMenu.id = Number(nameElement.parentNode.id);
    document.getElementById("textarea").value = event.target.textContent;
}
function dateDoubleClick(event) {
    let currentDateNode = event.target;
    let row = rows.get(Number(currentDateNode.parentNode.id));
    xCal(currentDateNode,  {lang: 'ru', fn: (date, ob) => {
            let parseDate = parseCalendarDateToDate(date);
            let time = row.time.textContent;
            let id = Number(currentDateNode.parentNode.id);
            let obj = {id: id, name: rows.get(id).name.textContent, date: parseCustomDateTime(parseDate, time), desc: 'desc'};
            patch(obj, "dance-lists/update");
            currentDateNode.textContent = parseDate;
        }  });
}
function timeDoubleClick(event) {
    let menu = document.getElementById('time-edit-menu');
    menu.style.display = "flex";
    updateMenuPosition(menu, event.target);

    let currentRow = event.target.parentNode;
    timeEditMenu.id = Number(currentRow.id);
}
function setBackgroundToAll(nodes, color) {
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].style.background = color;
    }
}
function highlightTableRow(row) {
    let nodes = document.getElementById("table").getElementsByTagName("tr");
    setBackgroundToAll(nodes, "#ffffff");
    row.style.background = "#ecf0fd";
}
function updateMenuPosition(menu, refElement) {
    let rec = refElement.getBoundingClientRect();
    menu.style.left = rec.left + "px";
    menu.style.top = (rec.top) + "px";
}
async function patch(obj, url) {
    await fetch("http://localhost:8080/" + url,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        });
}

var clickCount = 0;
document.getElementById("radio-dance-lists").addEventListener("dblclick", ev => {
})

function parseCustomDateTime(customDate, customTime) {
    const pattern = /(\d{2}) ([а-я]+) (\d{4})/;
    const match = customDate.match(pattern);
    if (!match) {
        throw new Error('Invalid custom date format');
    }
    const [, day, month, year] = match;
    let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября','ноября','декабря'];
    const parsedMonth = months.indexOf(month);

    const timePattern = /(\d{2}):(\d{2})/;
    const timeMatch = customTime.match(timePattern);
    if (!match) {
        throw new Error('Invalid custom time format');
    }
    const [, hours, minutes] = timeMatch;

    const parsedDate = new Date(year, parsedMonth, day, hours, minutes);
    console.log('parsed ' + parsedDate);
    return parsedDate;
}

function parseCalendarDateToDate(date) {
    const pattern = /(\d{2}).(\d{2}).(\d{4})/;
    const match = date.match(pattern);

    if (!match) {
        throw new Error('Invalid custom date-time format');
    }
    const [, day, month, year] = match;
    const dateOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };
    let parsedDate = new Date(year, month - 1, day).toLocaleDateString("ru-RU", dateOptions);
    parsedDate = parsedDate.replace(' г.', '');
    return parsedDate;
}