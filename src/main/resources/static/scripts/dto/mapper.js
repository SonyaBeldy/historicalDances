
class Mapper {
    static toDanceListDTOJson(danceList) {
        return {id: danceList.id, name: danceList.name, date: danceList.date, desc: danceList.desc};
    }
}