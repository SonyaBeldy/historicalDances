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

        const options = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };

        let d = new Date(date).toLocaleDateString('ru-RU', options);
        console.log(d);
        d = d.replace(',', '');
        // d = d.replace(/[а-я]/, c => c.toUpperCase());
        d = d.replace('г.', '');

        let desc = listArray[i].description;
        let listContainer = document.getElementById("table-items");
        listContainer.appendChild(createTableItem(id, name, d, desc));
    }
}

function createTableItem(id, name, date, desc) {

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

        console.log("id: " + id);

        document.getElementById("cancel").addEventListener("click", ev1 => {
            menu.style.display = "none";
        })

        document.getElementById("submit").addEventListener("click", async ev1 => {
            let obj = {id: id, name: document.getElementById("textarea").value, date: date, desc: desc};
            await fetch("http://localhost:8080/dance-list/update",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj)
                });
            menu.style.display = "none";
            // location.reload();
        })

        window.addEventListener("resize", ev => {
            updateMenuPosition(document.getElementById("edit-menu"), itemName);
        })
    });


    function updateMenuPosition(menu, refElement) {
        let rec = refElement.getBoundingClientRect();
        menu.style.left = rec.left + "px";
        menu.style.top = (rec.top) + "px";
    }


    let itemDate = document.createElement("td");
    itemDate.textContent = date;

    let itemDescription = document.createElement("td");
    itemDescription.textContent = desc;
    itemDescription.addEventListener("dblclick", ev => {
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
})


