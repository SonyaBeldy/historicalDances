

async function getDanceList() {
    return await fetch("dance-lists", {method: "GET"});
}

async function getDanceListJSON() {
    let danceListResponse = await getDanceList();
    return await danceListResponse.json();
}
async function patch(url, obj) {
    await fetch(url,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        });
}


async function updateDanceList(danceList) {
    await patch('dance-lists/update', danceList);
}
