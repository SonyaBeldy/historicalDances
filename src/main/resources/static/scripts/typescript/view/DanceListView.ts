import {DanceList} from "../models/DanceList.js";
import {DanceListListView, ListView} from "../view.js";
import {DanceListInfoView} from "./list-info-view.js";

export class DanceListView {
    $html: HTMLDivElement;
    public _danceListListView: DanceListListView;
    public _danceListInfoView: DanceListInfoView;
    private _$listContainer: HTMLDivElement;
    private _$danceListInfoContainer: HTMLDivElement;
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

    changeList(list: ListView): void {
        this._$listContainer.innerHTML = '';
        this._$listContainer.appendChild(list.$html);
    }
    changeInfo(danceList: DanceList): void {
        this._danceListInfoView.update(danceList);
    }

    selectListItem(danceList: DanceList): void {
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