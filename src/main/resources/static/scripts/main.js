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
