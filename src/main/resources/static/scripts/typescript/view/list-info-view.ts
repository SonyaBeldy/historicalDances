import {Observer} from "../utils/Observer.js";
import {DanceList} from "../models/DanceList.js";
import {dateToCustomDateString, dateToCustomTimeString} from "../utils/date-time-converter.js";

export class DanceListInfoView {

    private _$html: HTMLDivElement;
    private _$name: HTMLInputElement;
    private _$time: HTMLInputElement;
    private _$date: HTMLInputElement;
    private _$description: HTMLTextAreaElement;
    private _$dances: HTMLUListElement;
    constructor() {
        this._$html = document.createElement('div');
        this._$html.innerHTML =
            `
            <div class="flex-column gap-10 jost">
                <div class="flex-column gap-5">
                    <label for="name-input" class="font-size-12 bold">Название</label>
                    <input type="text" id="name-input" class="calendar jost bold">
                </div>
                <div class="flex-row gap-10">
                    <div class="flex-column gap-5">
                        <label for="date-input" class="font-size-12 bold">Дата</label>
                        <input type="date" id="date-input" class="calendar jost bold">
                    </div>
                    <div class="flex-column gap-5">
                        <label for="time-input" class="font-size-12 bold">Время</label>
                        <input type="time" id="time-input" class="calendar jost bold">
                    </div>
                </div>
                
                <div class="flex-column gap-5">
                    <label for="desc-input" class="font-size-12 bold">Описание</label>
                    <textarea id="desc-input" class="calendar jost bold"></textarea>
                </div>
                <div class="flex-column gap-5">
                    <label for="dances" class="font-size-12 bold">Танцы</label>
                    <ul id="dances">
                    </ul>
                </div>  
            </div>
            `;
        [this._$name, this._$date, this._$time] = this._$html.querySelectorAll('input');
        this._$description = this._$html.querySelector('textarea');
        this._$dances = this._$html.querySelector('ul');

    }
    update(element: DanceList): void {
        this._$name.value = element.name;
        // this._$date.value = dateToCustomDateString(element.date);
        this._$date.value = element.date.toISOString().substring(0, 10);
        // this._$time.value = dateToCustomTimeString(element.date);
        this._$time.value = element.date.toISOString().substring(11, 16);
        this._$description.value = element.desc;
    }

    get $html(): HTMLDivElement {
        return this._$html;
    }
}