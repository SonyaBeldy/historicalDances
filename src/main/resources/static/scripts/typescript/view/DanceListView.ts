import {DanceList} from "../models/DanceList.js";
import {DanceListListView, ListView} from "../view.js";
import {DanceListInfoView} from "./list-info-view.js";

export class DanceListView {
    _$html: HTMLDivElement;
    public _danceListListView: DanceListListView;
    public _danceListInfoView: DanceListInfoView;
    private _$listContainer: HTMLDivElement;
    private _$danceListInfoContainer: HTMLDivElement;
    constructor() {
        this._$html = document.getElementById('content-view') as HTMLDivElement;
        this._danceListListView = new DanceListListView();
        this._danceListInfoView = new DanceListInfoView();

        //todo что за #
        this._$listContainer = document.querySelector('#list-container');
        this._$danceListInfoContainer = document.querySelector('#list-info-container');
        this._$danceListInfoContainer.appendChild(this._danceListInfoView.$html);
    }

    show() {

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