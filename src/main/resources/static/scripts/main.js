
let danceList = document.getElementById("radio-dance-list");

let listContainer = document.getElementById("list-container");
danceList.addEventListener("change", async(ev) => {
    removeAllItems();
    let listValues = await fetch("http://localhost:8080/admin/dance-lists", { method: "GET" });
    await showList(listValues);
})

document.getElementById("radio-dances").addEventListener("change", async(ev) => {
    removeAllItems();
    let listValues = await fetch("http://localhost:8080/admin/dances", { method: "GET" });
    await showList(listValues);
});

document.getElementById("radio-dance-types").addEventListener("change", async(ev) => {
    removeAllItems();
    let listValues = await fetch("http://localhost:8080/admin/dance-types", { method: "GET" });
    await showList(listValues);
})


function removeAllItems() {
    while (listContainer.lastElementChild) {
        listContainer.removeChild(listContainer.lastElementChild);
    }
}

async function showList(listValues) {
    let listArray= (await listValues.json());
    for (let i = 0; i < listArray.length; i++) {
        let name = listArray[i].name;
        let listContainer = document.getElementById("list-container");
        listContainer.appendChild(createListItem(name));
    }
}

function createListItem(name) {

    let item = document.createElement("div");
    item.classList.add("list-item");

    let listName = document.createElement("span");
    listName.textContent = name;

    let moreBtn = document.createElement("button");
    moreBtn.classList.add("more-btn");

    let moreImg = document.createElement("img");
    moreImg.classList.add("more-img");
    moreImg.setAttribute("src", "../../images/btns/more-2-25.png");
    moreImg.setAttribute("alt", "");

    moreBtn.appendChild(moreImg);


    item.appendChild(listName);

    moreBtn.addEventListener("click", ev => {
        console.log(name)
    })
    item.appendChild(moreBtn);

    return item;
}

