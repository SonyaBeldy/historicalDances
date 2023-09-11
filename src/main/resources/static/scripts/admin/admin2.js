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
        let name = listArray[i].name;
        let date = listArray[i].date;
        let desc = listArray[i].description;
        let listContainer = document.getElementById("table-items");
        listContainer.appendChild(createTableItem(name, date, desc));
    }
}

function createTableItem(name, date, desc) {

    let item = document.createElement("tr");

    let itemName = document.createElement("td");
    itemName.textContent = name;

    let itemDate = document.createElement("td");
    itemDate.textContent = date;

    let itemDescription = document.createElement("td");
    itemDescription.textContent = desc;

    let itemState = document.createElement("td");
    itemState.textContent = "Нет";

    item.appendChild(itemName);
    item.appendChild(itemDate);
    item.appendChild(itemDescription);
    item.appendChild(itemState);

    return item;
}
