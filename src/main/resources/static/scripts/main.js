let danceList = document.getElementById("dance-list");
danceList.addEventListener("click", async(ev) => {
    console.log("HJKSHADHJ");
    let res = await fetch("http://localhost:8080/admin/dance-lists", { method: "GET" });
    console.log(await res.json());
})

 