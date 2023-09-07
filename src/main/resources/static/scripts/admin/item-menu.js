
let newItemBtn = document.getElementById("new-item-btn");

addEventListenerToCloseBtnById("dance-lists-close-btn", "dance-lists-add-menu-background");
addEventListenerToCloseBtnById("dances-close-btn", "dances-add-menu-background");
addEventListenerToCloseBtnById("dance-types-close-btn", "dance-types-add-menu-background");

// addEventListenerToSubmitBtnById("dances-confirm-btn");

newItemBtn.addEventListener("click", (ev) => {
    let menu;
    if(document.getElementById("radio-dance-list").checked) {
        console.log("dance-list")
        menu = document.getElementById("dance-lists-add-menu-background");

    } else if(document.getElementById("radio-dances").checked) {
        menu = document.getElementById("dances-add-menu-background");
        createSelectionMenu();
    } else if (document.getElementById("radio-dance-types").checked) {
        menu = document.getElementById("dance-types-add-menu-background");
    }

    menu.style.display = "flex";
})

async function createSelectionMenu() {
    let selection = document.getElementById("dance-type");
    let dances = await fetch("http://localhost:8080/admin/dance-types", {method: "GET"});

    let arrayDances = await dances.json();
    for (let i = 0; i < arrayDances.length; i++) {
        let item = document.createElement("option");
        item.textContent = arrayDances[i].name;
        selection.appendChild(item);
    }
}

function addEventListenerToCloseBtnById(id, menuId) {
    document.getElementById(id).addEventListener("click", (ev) => {
        document.getElementById(menuId).style.display = "none";
    })

}
function addEventListenerToSubmitBtnById(id) {
    document.getElementById("confirm-btn").addEventListener("click", async (ev) => {
        let listName = document.getElementById("list-name-input").value;
        let obj = {name: listName}
        let json = JSON.stringify(obj);
        console.log(json);

        let newListRes = await fetch("http://localhost:8080/admin/new-dance-list",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            });
        document.getElementById("creating-menu-background").style.display = "none";
    })
}




