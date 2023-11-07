import {Observer} from "../utils/Observer.js";
import {DanceList} from "../models/DanceList.js";
import {dateToCustomDateString, dateToCustomTimeString} from "../utils/date-time-converter.js";
import {Dance} from "../models/Dance";

export class DanceListInfoView {

    private _$html: HTMLDivElement;
    private _$name: HTMLInputElement;
    private _$time: HTMLInputElement;
    private _$date: HTMLInputElement;
    private _$description: HTMLTextAreaElement;
    private _$dances: HTMLUListElement;

    private _danceFromDanceListDeleteAction: (danceListId: number, danceInDanceList: Dance) => void;
    private _danceMenuOpenAction: (dancesInDanceListId: number) => void;
    private _danceMenuConfirmBtnAction: (danceListId: number, checkedDancesId: number[]) => void;
    constructor() {
        this._$html = document.createElement('div');
        this._$html.innerHTML =
            `<div class="flex-column gap-10 jost">
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
                <hr>
                <div class="flex-column gap-10 dance-menu-div">
                    <label for="dances" class="font-size-12  variant large">Танцы</label>
                    <button class="new-dance-for-dance-list-btn" id="add-dances-btn">+</button>
                    <ul id="dances">
                    </ul>
                </div>  
                <button class="button save-changes-btn" id="save-changes-btn">сохранить изменения</button>
            </div>
            `;
        [this._$name, this._$date, this._$time] = this._$html.querySelectorAll('input');
        this._$description = this._$html.querySelector('textarea');
        this._$dances = this._$html.querySelector('ul');
        this._$dances.classList.add('ul');

        this._$html.querySelector('button').addEventListener('click', ev => {
            document.getElementById('dances-menu-back').style.display = 'flex';

        });

        document.getElementById('close-dance-menu-btn').addEventListener('click', ev => {
            document.getElementById('dances-menu-back').style.display = 'none';
        })

    }


    update(danceList: DanceList): void {
        this._$name.value = danceList.name;
        this._$date.value = danceList.date.toISOString().substring(0, 10);
        this._$time.value = danceList.date.toISOString().substring(11, 16);
        this._$description.value = danceList.desc;

        let listItemsHtml = '';
        for (let currentDance of danceList.dances) {
            listItemsHtml +=
                `<li class="li flex-row space-between dance-list-dances">
                    <span>${currentDance.name}</span>
                    <button class="btn-img">
                        <img src="../../images/btns/garbage-16.png" class="">
                    </button>
                </li>`;
        }
        this._$dances.innerHTML = listItemsHtml;

        let removeBtns = this._$dances.querySelectorAll('button');
        for (let i = 0; i < removeBtns.length; i++) {
            removeBtns[i].addEventListener('click', ev => {
                this._danceFromDanceListDeleteAction(danceList.id, danceList.dances[i]);
            });
        }
        //TODO remove listeners
        document.getElementById('add-dances-btn').addEventListener('click', ev => {
            this._danceMenuOpenAction(danceList.id);
        });

        //TODO может в другой класс?
        document.getElementById('dances-from-dance-list-menu-confirm-btn').addEventListener('click', ev => {
            let checkboxes = document.getElementsByName('dances') as NodeListOf<HTMLInputElement> | null;
            let checkedDancesId: number[] = [];
            console.log(checkboxes);
            for (let i = 0; i < checkboxes.length; i++) {
                if(checkboxes.item(i).checked) {

                    checkedDancesId.push(Number(checkboxes.item(i).value));
                }
            }
            console.log('check');
            console.log(checkedDancesId);
            this._danceMenuConfirmBtnAction(danceList.id, checkedDancesId);
        });
    }

    //TODO нахрен сеты
    showDancesMenu(allDances: Set<Dance>, danceList: DanceList) {
        let menuHTML = document.getElementById('dances-from-dance-list-menu');
        let ul = menuHTML.querySelector('ul');
        let listItems = '';
        for (let currentDance of allDances) {
            listItems +=
                `<li class="flex-row gap-5">
                    <input type="checkbox" name="dances" value="${currentDance.id}" ${danceList.has(currentDance) ? "checked" : ""}>
                    <span>${currentDance.name}</span>
                    </li>`;

            // if(dancesInDanceList.has(currentDance)) {
            //     listItems +=
            //         `<li class="flex-row gap-5">
            //         <input type="checkbox" name="dances" disabled="disabled" checked>
            //         <span>${currentDance.name}</span>
            //         </li>`;
            // } else {
            //     listItems +=
            //         `<li class="flex-row gap-5">
            //         <input type="checkbox" name="dances">
            //         <span>${currentDance.name}</span>
            //         </li>`;
            // }
        }
        ul.innerHTML = listItems;
    }

    bindDanceMenuOpenAction(action: (dancesInDanceListId: number) => void): void {
        this._danceMenuOpenAction = action;
    }

    bindDanceDeleteAction(action: (danceListId: number, dance: Dance) => void): void {
        this._danceFromDanceListDeleteAction = action;
    }

    bindDanceMenuConfirmBtnAction(action: (danceListId: number, checkedDancesId: number[]) => void): void {
        this._danceMenuConfirmBtnAction = action;
    }

    get $html(): HTMLDivElement {
        return this._$html;
    }
}