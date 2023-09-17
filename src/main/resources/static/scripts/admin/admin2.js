setCheckedTab();
showCheckedTable();
let rows = new Map();
let currentRow = new TableRow();
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
    return await fetch("http://localhost:8080/admin/" + url, {method: "GET"});
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
let editMenu = new EditMenu(document.getElementById('edit-menu'));
async function fillTable(listValues) {
    let listArray= (await listValues.json());
    for (let i = 0; i < listArray.length; i++) {
        let id = listArray[i].id;
        let name = listArray[i].name;
        let date = listArray[i].date;
        let time = listArray[i].time;
        let desc = listArray[i].description;

        let tableRow = new TableRow(id, name, date, time, desc);

        const dateOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };

        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit'
        }

        // // let newDate = new Date(date).toLocaleDateString('ru-RU', options);
        // let newDate = new Date(date).toLocaleString('ru-RU', dateOptions);
        // let localeTime = new Date(date).toLocaleTimeString();
        //
        // newDate = newDate.replace(' г.', '');
        let listContainer = document.getElementById("table-items");
        rows.set(tableRow.id, tableRow);
        tableRow.name.addEventListener('dblclick', nameDoubleClick);
        tableRow.date.addEventListener('dblclick', dateDoubleClick);
        listContainer.appendChild(tableRow.row);


    }
    document.getElementById('cancel').addEventListener("click", ev1 => {
        editMenu.menu.style.display = "none";
    })
    document.getElementById('submit').addEventListener('click', async ev1 => {
        let newName = document.getElementById("textarea").value;
        let curRow = new TableRow();

        curRow = rows.get(editMenu.id);
        let obj = {id: editMenu.id, name: newName, date: parseCustomLocalizedDateTime(curRow.date.textContent), desc: 'desc'};
        patch(obj, "dance-list/update");
        editMenu.menu.style.display = "none";
        curRow.name.textContent = newName;
    })
    window.addEventListener("resize", ev => {
        if(editMenu.id != null) {
            updateMenuPosition(document.getElementById("edit-menu"),  document.getElementById(editMenu.id));
        }
    });

}

function nameDoubleClick(event) {
    currentRow = event.target.parentNode;

    let menu = document.getElementById("edit-menu");
    menu.style.display = "flex";

    let nameElement = event.target;
    editMenu.id = Number(nameElement.parentNode.id);
    // currentRow = event.target.parentNode.id;
    updateMenuPosition(editMenu.menu, nameElement);
    document.getElementById("textarea").value = nameElement.textContent;
}

function dateDoubleClick(event) {
    let ob = document.getElementById("input");
    let currentDateNode = event.target;
    xCal(currentDateNode,  {lang: 'ru', fn: (date, ob) => {
            let parseDate = parseCalendarDateToDate(date);
            let obj = {id: currentDateNode.parentNode.id, name: name, date: parseCustomLocalizedDateTime(parseDate), desc: 'desc'};
            patch(obj, "dance-list/update");
            currentDateNode.textContent = parseDate;
        }  });
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
function createTableRow(id, name, date, time, desc) {

    let row = document.createElement("tr");

    let tableRow = new TableRow(id, name, date, time, desc);

    row.setAttribute("id", id);
    row.addEventListener("click", ev => highlightTableRow(row));

    let itemName = document.createElement("td");
    itemName.textContent = name;
    // itemName.addEventListener("dblclick", ev => {
    //     let menu = document.getElementById("edit-menu");
    //     menu.style.display = "flex";
    //     updateMenuPosition(menu, itemName);
    //
    //     document.getElementById("textarea").value = name;
    //
    //     document.getElementById("cancel").addEventListener("click", ev1 => {
    //         menu.style.display = "none";
    //     })
    //
    //     let clone = document.getElementById('submit').cloneNode(true);
    //     document.getElementById('submit').parentNode.replaceChild(clone, document.getElementById('submit'));
    //     clone.addEventListener("click", async ev1 => {
    //
    //         let newName = document.getElementById("textarea").value;
    //         let obj = {id: id, name: newName, date: parseCustomLocalizedDateTime(date), desc: desc};
    //         patch(obj, "dance-list/update");
    //         menu.style.display = "none";
    //         itemName.textContent = newName;
    //     })
    //
    //     window.addEventListener("resize", ev => {
    //         updateMenuPosition(document.getElementById("edit-menu"), itemName);
    //     })
    // });



    let itemDate = document.createElement("td");
    itemDate.textContent = date;
    itemDate.addEventListener("dblclick", ev => {
        let ob = document.getElementById("input");
        xCal(itemDate,  {lang: 'ru', fn: (date, ob) => {
                let parseDate = parseCalendarDateToDate(date);
                let obj = {id: id, name: name, date: parseCustomLocalizedDateTime(parseDate), desc: desc};
                patch(obj, "dance-list/update");

                itemDate.textContent = parseDate;
            }  });
    });

    let itemTime = document.createElement("td");
    itemTime.textContent = time;

    let itemDescription = document.createElement("td");
    itemDescription.textContent = id;
    itemDescription.addEventListener("dblclick", ev => {
    })

    let itemState = document.createElement("td");
    itemState.textContent = "Нет";

    row.appendChild(itemName);
    row.appendChild(itemDate);
    row.appendChild(itemTime);
    row.appendChild(itemDescription);
    row.appendChild(itemState);

    return row;
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

function parseCustomLocalizedDateTime(customDateTime) {
    // const pattern = /(\d{2}) ([а-я]+) (\d{4}) в (\d{2}):(\d{2})/;
    const pattern = /(\d{2}) ([а-я]+) (\d{4})/;

    const match = customDateTime.match(pattern);

    if (!match) {
        throw new Error('Invalid custom date-time format');
    }

    const [, day, month, year] = match;
    let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября','ноября','декабря'];

    const parsedMonth = months.indexOf(month);


    // Create a new Date object with the parsed components
    const parsedDate = new Date(year, parsedMonth, day);
    // const parsedDate = new Date(year, parsedMonth, day, hours, minutes);
    console.log('parsed ' + parsedDate);
    return parsedDate;
}

function parseCalendarDateToDate(date) {
    console.log("itemDate " + date);
    const pattern = /(\d{2}).(\d{2}).(\d{4})/;

    const match = date.match(pattern);

    if (!match) {
        throw new Error('Invalid custom date-time format');
    }

    const [, day, month, year] = match;

    // let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября','ноября','декабря'];
    // const parsedMonth = months.indexOf(month);


    // Create a new Date object with the parsed components
    const dateOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };
    let parsedDate = new Date(year, month - 1, day).toLocaleDateString("ru-RU", dateOptions);
    parsedDate = parsedDate.replace(' г.', '');
    return parsedDate;
}