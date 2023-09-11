if(sessionStorage.getItem('data')) {
    document.getElementById(sessionStorage.getItem('data')).checked = true;
} else {
    document.getElementById("radio-dance-list").checked = true;
    sessionStorage.setItem("data", "radio-dance-list");
}

let listContainer = document.getElementById("list-container");
showCheckedList();
async function showCheckedList() {
    if(document.getElementById("radio-dance-list").checked) {
        await showList(await getItemList("dance-lists"));
    } else if(document.getElementById("radio-dances").checked) {
        await showList(await getItemList("dances"));
    } else if(document.getElementById("radio-dance-types").checked) {
        await showList(await getItemList("dance-types"));
    }
}

async function getItemList(url) {
    return await fetch("http://localhost:8080/admin/" + url, {method: "GET"});
}
document.getElementById("radio-dance-list").addEventListener("change", async(ev) => {
    removeAllItems();
    await showList(await getItemList("dance-lists"));
    sessionStorage.setItem("data", "radio-dance-list");
})

document.getElementById("radio-dances").addEventListener("change", async(ev) => {
    removeAllItems();
    await showList(await getItemList("dances"));
    sessionStorage.setItem("data","radio-dances");
});

document.getElementById("radio-dance-types").addEventListener("change", async(ev) => {
    removeAllItems();
    await showList(await getItemList("dance-types"));
    sessionStorage.setItem("data","radio-dance-types");
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

