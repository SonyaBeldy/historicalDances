var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DanceList } from "./models/DanceList.js";
import { Dance } from "./models/Dance.js";
import { ObservableList } from "./utils/Observer.js";
import { DanceType } from "./models/DanceType.js";
export class AdminPageModel {
    constructor() {
        // this.danceLists = new ObservableList<DanceList>();
    }
    updateDanceLists() {
        return __awaiter(this, void 0, void 0, function* () {
            this.danceLists = new ObservableList();
            let danceListsJSON = yield this.getDanceListsJSON();
            for (let i = 0; i < danceListsJSON.length; i++) {
                let id = danceListsJSON[i].id;
                let name = danceListsJSON[i].name;
                let date = new Date(danceListsJSON[i].date);
                let desc = danceListsJSON[i].description;
                this.danceLists.add(new DanceList(id, name, date, desc));
            }
        });
    }
    updateDances() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dances = new ObservableList();
            let dancesJSON = yield this.getDancesJSON();
            for (let i = 0; i < dancesJSON.length; i++) {
                let id = dancesJSON[i].id;
                let name = dancesJSON[i].name;
                let danceType = dancesJSON[i].danceType;
                let videoLink = dancesJSON[i].videoLink;
                let description = dancesJSON[i].description;
                let difficulty = dancesJSON[i].difficulty;
                this.dances.add(new Dance(id, name, danceType, videoLink, description, difficulty));
            }
        });
    }
    updateDanceTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO
            this.danceTypes = new ObservableList();
            let danceTypesJSON = yield this.getDanceTypesJSON();
            for (let i = 0; i < danceTypesJSON.length; i++) {
                let id = danceTypesJSON[i].id;
                let name = danceTypesJSON[i].name;
                this.danceTypes.add(new DanceType(id, name));
            }
        });
    }
    //TODO dance types
    getDanceListsJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch('dance-lists', { method: 'GET' });
            return yield response.json();
        });
    }
    getDancesJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch('dances', { method: 'GET' });
            return yield response.json();
        });
    }
    getDanceTypesJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch('dance-types', { method: 'GET' });
            return yield response.json();
        });
    }
    addDance() {
    }
}
// type DanceListsType = {
//     [name: string]: DanceListItem;
// }
