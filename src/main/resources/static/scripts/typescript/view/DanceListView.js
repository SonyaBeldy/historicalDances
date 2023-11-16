import { DanceListListView } from "../view.js";
import { DanceListInfoView } from "./list-info-view.js";
export class DanceListView {
    constructor() {
        this._danceListListView = new DanceListListView();
        this._danceListInfoView = new DanceListInfoView();
        this._$listContainer = document.querySelector('#list-container');
        this._$danceListInfoContainer = document.querySelector('#list-info-container');
        this._$danceListInfoContainer.appendChild(this._danceListInfoView.$html);
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
}
