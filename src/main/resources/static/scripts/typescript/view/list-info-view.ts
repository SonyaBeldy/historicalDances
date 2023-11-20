import {DanceList} from "../models/DanceList.js";
import {inputDateToDate} from "../utils/date-time-converter.js";
import {Dance} from "../models/Dance.js";
import {BiMap, DanceMenuView} from "./DanceMenuView.js";

export class DanceListInfoView {


    private currentDanceList: DanceList;
    private _$html: HTMLDivElement;
    private _$name: HTMLInputElement;
    private _$time: HTMLInputElement;
    private _$date: HTMLInputElement;
    private _$description: HTMLTextAreaElement;
    private _$dancesUl: HTMLUListElement;
    private dances: BiMap<Dance, HTMLLIElement>

    private _dancesMenu: DanceMenuView;
    get dancesMenu(): DanceMenuView {
        return this._dancesMenu;
    }
    private _danceFromDanceListDeleteAction: (danceListId: number, danceInDanceList: Dance) => void;
    private _danceMenuOpenAction: (danceList: DanceList) => void;
    private _danceMenuConfirmBtnAction: (danceList: DanceList, checkedDancesId: number[]) => void;
    private _saveChangesBtnAction: (danceList: DanceList, updatedDAnceList: DanceList) => void;
    private _removeDanceListBtnAction: (danceList: DanceList) => void;
    private _nameInputChangeAction: (danceListId: number) => void;
    constructor() {
        this._$html = document.createElement('div');
        this._$html.innerHTML =
            `<div class="flex-column gap-10 jost">
                <div class="flex-column gap-5">
                    <label for="name-input" class="font-size-12 weight-600">Название</label>
                    <input type="text" id="name-input" class="calendar input jost">
                </div>
                <div class="flex-row gap-10">
                    <div class="flex-column gap-5">
                        <label for="date-input" class="font-size-12 weight-600">Дата</label>
                        <input type="date" id="date-input" class="calendar input jost">
                    </div>
                    <div class="flex-column gap-5">
                        <label for="time-input" class="font-size-12 weight-600">Время</label>
                        <input type="time" id="time-input" class="calendar jost">
                    </div>
                </div>
                
                <div class="flex-column gap-5">
                    <label for="desc-input" class="font-size-12 weight-600">Описание</label>
                    <textarea id="desc-input" class="calendar jost"></textarea>
                </div>
                <div class="flex-column gap-10 dance-menu-div">
                    <div class="flex-row gap-10">
                        <label for="dances" class="font-size-12  variant large">Танцы</label>
                        <button class="new-dance-for-dance-list-btn" id="add-dances-btn">
                            <img src="../../images/btns/edit-16.png" class="">
                        </button>
                    </div>
                    <ul id="dances">
                    </ul>
                </div>  
                <div>
                    <button class="button " id="delete-dance-list-btn">удалить</button>
                    <button class="button save-changes-btn" id="save-changes-btn">сохранить изменения</button>
                </div>
            </div>
            `;
        [this._$name, this._$date, this._$time] = this._$html.querySelectorAll('input');
        this._$description = this._$html.querySelector('textarea');
        this._$dancesUl = this._$html.querySelector('ul');
        this._$dancesUl.classList.add('ul');

        this.dances = new BiMap<Dance, HTMLLIElement>();
        this._dancesMenu = new DanceMenuView();

    }

    update(danceList: DanceList): void {
        this._$name.value = danceList.name;
        this._$date.value = danceList.date.toISOString().substring(0, 10);
        this._$time.value = danceList.date.toISOString().substring(11, 16);
        this._$description.value = danceList.desc;

        this._$name.addEventListener('input', ev => {this.checkInputForChanges(this._$name, danceList.name);});

        this.fillDances(danceList.dances);
        this._dancesMenu.bindConfirmBtnAction((dances) => {
            this.fillDances(dances);
        });

        let removeBtns = this._$dancesUl.querySelectorAll('button');
        for (let i = 0; i < removeBtns.length; i++) {
            removeBtns[i].addEventListener('click', ev => {
                this._danceFromDanceListDeleteAction(danceList.id, danceList.dances[i]);
            });
        };

        let addDancesBtn = document.getElementById('add-dances-btn');
        this.cloneElement(addDancesBtn).addEventListener('click', ev => {
            this._dancesMenu.show();
        });

        let saveChangesBtn = document.getElementById('save-changes-btn');
        let clone = saveChangesBtn.cloneNode(true);
        saveChangesBtn.replaceWith(clone);
        clone.addEventListener('click', ev => {
            this._saveChangesBtnAction(danceList, this.getUpdatedDanceList(danceList));
        });
        this.cloneElement(saveChangesBtn).addEventListener('click', ev => {
            this._saveChangesBtnAction(danceList, this.getUpdatedDanceList(danceList));
        });

        this.cloneElement(document.getElementById('delete-dance-list-btn')).addEventListener('click', ev => {
           this._removeDanceListBtnAction(danceList);
        });

    }

    fillDances(dances: Dance[]) {
        this.dances.clear();
        this._$dancesUl.innerHTML = '';
        for (let currentDance of dances) {
            //todo что не так
            // let li = new HTMLLIElement();
            let li = document.createElement('li');
            li.innerHTML =
                `<span>${currentDance.name}</span>
                 <button class="btn-img">
                    <img src="../../images/btns/close-16.png" class="">
                 </button>`;
            li.classList.add('li', 'flex-row', 'space-between', 'dance-list-dances')
            this._$dancesUl.appendChild(li);
            this.dances.set(currentDance, li);
        }
    }

    cloneElement(elementToClone: HTMLElement): HTMLElement {
        let clone = elementToClone.cloneNode(true) as HTMLElement;
        elementToClone.replaceWith(clone);
        return clone;
    }

    // generateDancesInDanceMenu(allDances: Dance[], danceList: DanceList) {
    //     let menuHTML = document.getElementById('dances-from-dance-list-menu');
    //     let ul = menuHTML.querySelector('ul');
    //     let listItems = '';
    //     for (let currentDance of allDances) {
    //         listItems +=
    //             `<li class="flex-row gap-5">
    //                 <input type="checkbox" name="dances" value="${currentDance.id}" ${danceList.has(currentDance) ? "checked" : ""}>
    //                 <span>${currentDance.name}</span>
    //                 </li>`;
    //     }
    //     ul.innerHTML = listItems;
    // }
    setCheckedToDances(ulHtml: HTMLUListElement, danceList: DanceList) {


    }

    private getUpdatedDanceList(oldDanceList: DanceList) {
        let name = this._$name.value;
        let date = this._$date.value;
        let time = this._$time.value;
        let desc = this._$description.value;
        return new DanceList(
            oldDanceList.id,
            name,
            inputDateToDate(date, time),
            desc,
            []);
    }

    checkInputForChanges(input: HTMLInputElement, value: string) {
        // console.log(input.value + ' & ' + value);
        // if(input.value != value) {
        //     input.style.borderColor = '#91f55f';
        //     // input.classList.replace('input', 'input-change');
        // } else {
        //     input.style.border = '#b1b9b7';
        // }
    }

    bindDanceMenuOpenAction(action: (danceList: DanceList) => void): void {
        this._danceMenuOpenAction = action;
    }

    bindDanceDeleteAction(action: (danceListId: number, dance: Dance) => void): void {
        this._danceFromDanceListDeleteAction = action;
    }

    bindDanceMenuConfirmBtnAction(action: (danceList: DanceList, checkedDancesId: number[]) => void): void {
        this._danceMenuConfirmBtnAction = action;
    }

    bindSaveChangesBtnAction(action: (danceList: DanceList) => void): void {
        this._saveChangesBtnAction = action;
    }

    bindRemoveDanceListBtnAction(action: (danceList: DanceList) => void): void {
        this._removeDanceListBtnAction = action;
    }

    get $html(): HTMLDivElement {
        return this._$html;
    }
}