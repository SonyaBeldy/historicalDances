import {DanceList} from "./models/DanceList.js";
import {Dance} from "./models/Dance.js";
import {ObservableList} from "./utils/Observer.js";
import {DanceType} from "./models/DanceType.js";

export class AdminPageModel {

    // danceLists: DanceList[];
    danceLists: ObservableList<DanceList>;
    dances: ObservableList<Dance>;
    danceTypes: ObservableList<DanceTypeJSON>;

    constructor() {
        // this.danceLists = new ObservableList<DanceList>();
    }


     public async updateDanceLists() {
        this.danceLists = new ObservableList<DanceList>();
        let danceListsJSON = await this.getDanceListsJSON();
        console.log(danceListsJSON);
         for (let i = 0; i < danceListsJSON.length; i++) {
            let id = danceListsJSON[i].id;
            let name = danceListsJSON[i].name;
            let date = new Date(danceListsJSON[i].date);
            let desc = danceListsJSON[i].description;
            let dancesFromJson = danceListsJSON[i].dances;

            let dances: Dance[] = [];
             for (let j = 0; j < dancesFromJson.length; j++) {
                 let dance = this.dances.getBy('id', dancesFromJson[j].id);
                dances.push(dance);
             }
            this.danceLists.add(new DanceList(id, name, date, desc, dances));
         }
    }

    public async updateDances() {
        this.dances = new ObservableList<Dance>();
        let dancesJSON = await this.getDancesJSON();
        for (let i = 0; i < dancesJSON.length; i++) {
            let id = dancesJSON[i].id;
            let name = dancesJSON[i].name;
            let danceType = dancesJSON[i].danceType;
            let videoLink = dancesJSON[i].videoLink;
            let description = dancesJSON[i].description;
            let difficulty = dancesJSON[i].difficulty;
            this.dances.add(new Dance(id, name, danceType, videoLink, description, difficulty));
        }
    }

    public async updateDanceTypes() {
        //TODO
        this.danceTypes = new ObservableList<DanceType>();
        let danceTypesJSON = await this.getDanceTypesJSON();
        for (let i = 0; i < danceTypesJSON.length; i++) {
            let id = danceTypesJSON[i].id;
            let name = danceTypesJSON[i].name;
            this.danceTypes.add(new DanceType(id, name));
        }
    }

    //TODO dance types

    private async getDanceListsJSON(): Promise<DanceListJSON[]> {
        let response = await fetch('dance-lists', {method: 'GET'});
        return await response.json();
    }

    private async getDancesJSON(): Promise<DanceJSON[]> {
        let response = await fetch('dances', {method: 'GET'});
        return await response.json();
    }

    private async getDanceTypesJSON(): Promise<DanceTypeJSON[]> {
        let response = await fetch('dance-types', {method: 'GET'});
        return await response.json();
    }
    public addDance() {

    }

    public removeDanceFromDanceList() {

    }

}

type DanceListJSON = {
    id: number;
    name: string;
    date: string; //??
    description: string;
    dances: Dance[];
}
type DanceJSON = {
    id: number;
    name: string;
    danceType: string;
    videoLink: string;
    description: string;
    difficulty: number;
}
type DanceTypeJSON = {
    id: number;
    name: string;
}
// type DanceListsType = {
//     [name: string]: DanceListItem;
// }
