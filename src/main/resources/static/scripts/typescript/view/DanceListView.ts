import {DanceList} from "../models/DanceList.js";
import {DanceListListView, ListView} from "../view.js";
import {DanceListInfoView} from "./list-info-view.js";

export class DanceListView {
    public _danceListListView: DanceListListView;
    public _danceListInfoView: DanceListInfoView;
    private _$listContainer: HTMLDivElement;
    private _$danceListInfoContainer: HTMLDivElement;
    constructor() {
        this._danceListListView = new DanceListListView();
        this._danceListInfoView = new DanceListInfoView();

        this._$listContainer = document.querySelector('#list-container');
        this._$danceListInfoContainer = document.querySelector('#list-info-container');
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
}