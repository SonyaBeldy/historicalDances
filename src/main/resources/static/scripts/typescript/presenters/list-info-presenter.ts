import {AdminPageView} from "../view";
import {AdminPageModel} from "../admin-page-model.js";
import {DanceList} from "../models/DanceList.js";
import {DanceListInfoView} from "../view/list-info-view.js";
import {DanceListView} from "../view/DanceListView.js";

export class DanceListPresenter {
    private _view: DanceListView;
    private _model: AdminPageModel;

    constructor(view: DanceListView, model: AdminPageModel) {
        this._view = view;
        this._model = model;

        this._view._danceListListView.bindListItemChangeAction(this.changeInfo.bind(this));
        this._model.updateDanceLists().then(()=> {
            this._model.danceLists.addObserver(this._view._danceListListView);
        });
    }

    changeInfo(danceListId: number) {
        console.log('changeInfo')
        for (let i = 0; i < this._model.danceLists.length; i++) {
            if (this._model.danceLists.get(i).id == danceListId) {
                this._view.changeInfo(this._model.danceLists.get(i));
                break;
            }
        }
    }

}