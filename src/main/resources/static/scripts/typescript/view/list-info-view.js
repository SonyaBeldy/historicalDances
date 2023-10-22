import { dateToCustomDateString, dateToCustomTimeString } from "../utils/date-time-converter.js";
export class DanceListInfoView {
    constructor() {
        this._$html = document.createElement('div');
        this._$name = document.createElement('input');
        this._$date = document.createElement('input');
        this._$time = document.createElement('input');
        this._$description = document.createElement('textarea');
        this._$dances = document.createElement('ul');
        this._$html.appendChild(this._$name);
        this._$html.appendChild(this._$date);
        this._$html.appendChild(this._$time);
        this._$html.appendChild(this._$description);
    }
    update(element) {
        this._$name.value = element.name;
        this._$date.value = dateToCustomDateString(element.date);
        this._$time.value = dateToCustomTimeString(element.date);
        this._$description.value = element.desc;
    }
    get $html() {
        return this._$html;
    }
}
