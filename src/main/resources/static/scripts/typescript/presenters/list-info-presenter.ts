import {AdminPageView} from "../view";
import {AdminPageModel} from "../admin-page-model.js";
import {DanceList} from "../models/DanceList.js";
import {DanceListInfoView} from "../view/list-info-view.js";
import {DanceListView} from "../view/DanceListView.js";
import {Dance} from "../models/Dance";

export class DanceListPresenter {
    private _view: DanceListView;
    private _model: AdminPageModel;

    constructor(view: DanceListView, model: AdminPageModel) {
        this._view = view;
        this._model = model;

        this._view._danceListListView.bindListItemChangeAction(this.changeInfo.bind(this));
        this._view._danceListInfoView.bindDanceDeleteAction(this.removeDance.bind(this));
        this._model.updateDances().then(() => {
            this._view._danceListInfoView.bindDanceMenuOpenAction(this.showDancesMenu.bind(this));
        })
        this._model.updateDanceLists().then(()=> {
            this._model.danceLists.addObserver(this._view._danceListListView);

        });
    }

    showDancesMenu(danceListId: number) {
        for (let i = 0; i < this._model.danceLists.length; i++) {
            if (this._model.danceLists.get(i).id == danceListId) {
                this._view._danceListInfoView.showDancesMenu(new Set(this._model.dances.getAll()), this._model.danceLists.get(i));
                break;
            }
        }
    }

    changeInfo(danceListId: number) {
        for (let i = 0; i < this._model.danceLists.length; i++) {
            if (this._model.danceLists.get(i).id == danceListId) {
                this._view.changeInfo(this._model.danceLists.get(i));
                this._view.selectListItem(i);
                break;
            }
        }
    }
    
    removeDance(danceListId: number, dance: Dance): void {
        console.log('remove');
        for (let i = 0; i < this._model.danceLists.length; i++) {
            let danceList = this._model.danceLists.get(i);
            if (danceList.id == danceListId) {
                this._model.danceLists.get(i).removeDance(dance);
                this._view.changeInfo(this._model.danceLists.get(i));
                console.log(danceList.dances.size);

                // for (let j = 0; j < danceList.dances.size; j++) {
                //     if (danceList.dances[j].id == danceId) {
                //         console.log('==')
                //         this._model.danceLists.get(i).removeDance(danceList.dances[j]);
                //         this._view.changeInfo(this._model.danceLists.get(i));
                //     } else {
                //         console.log('!=')
                //     }
                // }
                break;
            }
        }
    }
}