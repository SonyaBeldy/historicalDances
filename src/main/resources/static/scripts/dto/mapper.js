
class Mapper {
    static toDanceListDTOJson(danceList) {
        return {
            id: danceList.id,
            name: danceList.name,
            date: danceList.date,
            description: danceList.desc
        };
    }

    static toDanceDTOJson(dance) {
        return {
            id: dance.id,
            name: dance.name,
            danceType: dance.danceType,
            videoLink: dance.videoLink,
            description: dance.desc,
            difficulty: dance.difficulty
        }
    }
}