import { DanceListListView } from "../view.js";
import { DanceListInfoView } from "./list-info-view.js";
export class DanceListView {
    constructor() {
        this._$html = document.getElementById('content-view');
        this._danceListListView = new DanceListListView();
        this._danceListInfoView = new DanceListInfoView();
        //todo что за #
        this._$listContainer = document.querySelector('#list-container');
        this._$danceListInfoContainer = document.querySelector('#list-info-container');
        this._$danceListInfoContainer.appendChild(this._danceListInfoView.$html);
    }
    show() {
    }
    changeList(list) {
        this._$listContainer.innerHTML = '';
        this._$listContainer.appendChild(list.$html);
    }
    changeInfo(danceList) {
        this._danceListInfoView.update(danceList);
    }
    selectListItem(danceList) {
        this._danceListListView.clearListItemAndNewItemBtnSelection();
        this._danceListListView.selectListItem(danceList);
    }
    selectNewDanceBtn() {
        this._danceListListView.clearListItemAndNewItemBtnSelection();
        this._danceListListView.selectNewItemBtn();
    }
    unSelectNewDanceBtn() {
        this._danceListListView.clearListItemAndNewItemBtnSelection();
    }
}
