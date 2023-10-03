

async function _getDanceList() {
    return await fetch("dance-lists", {method: "GET"});
}

async function getDanceListJSON() {
    let danceListResponse = await _getDanceList();
    return await danceListResponse.json();
}

async function _getDances() {
    return await fetch('dances', {method:'GET'});
}

async function getDancesJSON() {
    let dancesResponse = await _getDances();
    return await dancesResponse.json();
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
