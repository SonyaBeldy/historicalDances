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
        updateMenuPosition(document.getElementById("edit-menu"), itemName);
        document.getElementById("textarea").textContent = name;
        window.addEventListener("resize", ev => {
            updateMenuPosition(document.getElementById("edit-menu"), itemName);
        })
    });


    function updateMenuPosition(menu, refElement) {
        let rec = refElement.getBoundingClientRect();
        menu.style.left = rec.left + "px";
        console.log(rec.top - menu.style.height/2);
        console.log(menu.style.height);
        menu.style.top = (rec.top) + "px";
    }


    let itemDate = document.createElement("td");
    itemDate.textContent = date;

    let itemDescription = document.createElement("td");
    itemDescription.textContent = desc;
    itemDescription.addEventListener("dblclick", ev => {
        console.log("desc dbclick");
    })

    let itemState = document.createElement("td");
    itemState.textContent = "Нет";

    item.appendChild(itemName);
    item.appendChild(itemDate);
    item.appendChild(itemDescription);
    item.appendChild(itemState);

    return item;
}

var clickCount = 0;
document.getElementById("radio-dance-lists").addEventListener("dblclick", ev => {
    console.log("radio dbclick");
})


