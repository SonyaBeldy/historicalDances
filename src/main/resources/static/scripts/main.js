let danceList = document.getElementById("radio-dance-list");
danceList.addEventListener("click", async(ev) => {
    let res = await fetch("http://localhost:8080/admin/dance-lists", { method: "GET" });
    let name = (await res.json())[0].name;

    let listContainer = document.getElementById("list-container");
    listContainer.appendChild(createListItem(name));
})

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
    item.appendChild(moreBtn);

    return item;
}

let confirmBtn = document.getElementById("new-item-btn");

confirmBtn.addEventListener("click", (ev) => {
    let menu = document.getElementById("creating-menu-background");
    menu.style.display = "flex";
})

document.getElementById("close-btn").addEventListener("click", (ev) => {
    document.getElementById("creating-menu-background").style.display = "none";
})

document.getElementById("confirm-btn").addEventListener("click", (ev) => {
    let listName = document.getElementById("list-name-input").value;
    let obj = {name: listName}
    let json = JSON.stringify(obj);
    console.log(json);

    let newListRes = fetch("http://localhost:8080/admin", {method: "POST"});
})