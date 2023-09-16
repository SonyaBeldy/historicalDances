if(sessionStorage.getItem('data')) {
    document.getElementById(sessionStorage.getItem('data')).checked = true;
} else {
    document.getElementById("radio-dance-lists").checked = true;
    sessionStorage.setItem("data", "radio-dance-lists");
}


showCheckedTable();
async function showCheckedTable() {
    if(document.getElementById("radio-dance-lists").checked) {
        await fillTable(await getItemList("dance-lists"));
    }
}


async function getItemList(url) {
    return await fetch("http://localhost:8080/admin/" + url, {method: "GET"});
}
async function fillTable(listValues) {
    let listArray= (await listValues.json());
    for (let i = 0; i < listArray.length; i++) {
        let id = listArray[i].id;
        let name = listArray[i].name;
        let date = listArray[i].date;

        const dateOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
            // hour: '2-digit',
            // minute: '2-digit',
        };

        // let newDate = new Date(date).toLocaleDateString('ru-RU', options);

        let newDate = new Date(date).toLocaleString('ru-RU', dateOptions);
        let localeTime = new Date(date).toLocaleTimeString();
        // d = d.replace(',', '');
        let time = listArray[i].time;
        // // d = d.replace(/[а-я]/, c => c.toUpperCase());
        newDate = newDate.replace(' г.', '');

        let desc = listArray[i].description;
        let listContainer = document.getElementById("table-items");

        listContainer.appendChild(createTableItem(id, name, newDate, time, desc));
    }
}

function createTableItem(id, name, date, time, desc) {

    let item = document.createElement("tr");
    item.setAttribute("id", id);
    item.addEventListener("click", ev => {
        let nodes = document.getElementById("table").getElementsByTagName("tr");
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].style.background = "#ffffff";
        }
        item.style.background = "#ecf0fd";
    });

    let itemName = document.createElement("td");
    itemName.textContent = name;
    itemName.addEventListener("dblclick", ev => {
        let menu = document.getElementById("edit-menu");
        menu.style.display = "flex";
        updateMenuPosition(menu, itemName);
        document.getElementById("textarea").value = name;

        document.getElementById("cancel").addEventListener("click", ev1 => {
            menu.style.display = "none";
        })

        document.getElementById("submit").addEventListener("click", async ev1 => {

            let obj = {id: id, name: document.getElementById("textarea").value, date: parseCustomLocalizedDateTime(date), desc: desc};
            updateData(obj, "dance-list/update");
            menu.style.display = "none";
            location.reload();
        })

        window.addEventListener("resize", ev => {
            updateMenuPosition(document.getElementById("edit-menu"), itemName);
        })
    });



    let itemDate = document.createElement("td");
    itemDate.textContent = date;
    itemDate.addEventListener("dblclick", ev => {
        let ob = document.getElementById("input");
        xCal(itemDate,  {lang: 'ru', fn: (date, ob) => {
                let parseDate = parseCalendarDateToDate(date);
                let obj = {id: id, name: document.getElementById("textarea").value, date: parseCustomLocalizedDateTime(parseDate), desc: desc};
                updateData(obj, "dance-list/update");

                itemDate.textContent = parseDate;
            }  });
    });

    let itemTime = document.createElement("td");
    itemTime.textContent = time;

    let itemDescription = document.createElement("td");
    itemDescription.textContent = desc;
    itemDescription.addEventListener("dblclick", ev => {
    })

    let itemState = document.createElement("td");
    itemState.textContent = "Нет";

    item.appendChild(itemName);
    item.appendChild(itemDate);
    item.appendChild(itemTime);
    item.appendChild(itemDescription);
    item.appendChild(itemState);

    return item;
}
function updateMenuPosition(menu, refElement) {
    let rec = refElement.getBoundingClientRect();
    menu.style.left = rec.left + "px";
    menu.style.top = (rec.top) + "px";
}
async function updateData(obj, url) {
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