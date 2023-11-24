import { DanceListListView } from "../view.js";
import { DanceListInfoView } from "./list-info-view.js";
export class DanceListView {
    constructor() {
        this.$html = document.createElement('div');
        this.$html.classList.add('flex-row', 'gap-5');
        this.$html.innerHTML =
            `<div id="list-container"></div>
            <div id="list-info-container"></div>`;
        this._danceListListView = new DanceListListView();
        this._danceListInfoView = new DanceListInfoView();
        //todo что за #
        this._$listContainer = this.$html.querySelector('#list-container');
        this._$listContainer.appendChild(this._danceListListView.$html);
        this._$danceListInfoContainer = this.$html.querySelector('#list-info-container');
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
    unSelectNewDanceBtn() {
        this._danceListListView.clearListItemAndNewItemBtnSelection();
    }
}
