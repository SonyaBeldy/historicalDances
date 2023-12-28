import {Dance} from "../../models/Dance.js";
import {DanceItem} from "./DanceItem.js";

export class DancesGrid {
    $html: HTMLDivElement;
    constructor() {
        this.$html = document.getElementById('dances-greed') as HTMLDivElement;
        console.log('gfgfhdgf')
        this.$html.classList.add('greed');
    }

    update(dances: Dance[]) {
        this.$html.innerHTML = ``;
        for (let i = 0; i < dances.length; i++) {
            console.log(dances[i].name);
            let danceItem = new DanceItem(dances[i]);
            this.$html.appendChild(danceItem.$html);
        }
    }
}