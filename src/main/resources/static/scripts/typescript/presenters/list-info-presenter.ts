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

        this._view._danceListListView.bindNewDanceListBtnAction(this.changeInfoForNewDanceList.bind(this));

        this._view._danceListInfoView.bindDanceMenuConfirmBtnAction(this.selectDances.bind(this));
        //TODO почему если опустить вниз, то не работает
        this._view._danceListInfoView.bindSaveChangesBtnAction(this.saveChanges.bind(this));

        this._model.updateDances().then(() => {
            this._view._danceListInfoView.bindDanceMenuOpenAction(this.generateDancesInDanceMenu.bind(this));
        });

        this._model.updateDanceLists().then(()=> {
            this._model.danceLists.addObserver(this._view._danceListListView);

        });
    }

    changeInfo(danceList: DanceList) {
        this._view.changeInfo(danceList);
        for (let i = 0; i < this._model.danceLists.length; i++) {
            if (this._model.danceLists.get(i).id == danceList.id) {
                //todo maybe use a hash map?
                this._view.selectListItem(i);
                break;
            }
        }
        this._view._danceListInfoView.bindSaveChangesBtnAction(this.saveChanges.bind(this));
    }

    changeInfoForNewDanceList(newDanceList: DanceList) {
        newDanceList.name = 'Новая подборка';

        //todo: why list duplicated
        // this._model.danceLists.add(newDanceList);
        this._view.changeInfo(newDanceList);
        this._view.selectNewDanceBtn();
        this._view._danceListInfoView.bindSaveChangesBtnAction(this.createNewDanceList.bind(this));
    }


    createNewDanceList(danceListId: number, newDanceList: DanceList) {
        this._model.danceLists.add(newDanceList);
    }

    generateDancesInDanceMenu(danceListId: number) {
        for (let i = 0; i < this._model.danceLists.length; i++) {
            if (this._model.danceLists.get(i).id == danceListId) {
                this._view._danceListInfoView.generateDancesInDanceMenu(this._model.dances.getAll(), this._model.danceLists.get(i));
                return;
            }
        }
        //TODO убрать позорный пустой лист
        this._view._danceListInfoView.generateDancesInDanceMenu(this._model.dances.getAll(), new DanceList(-1, '', new Date(), '', []));
    }

    selectDances(danceListId: number, checkedDancesId: number[]) {
        let danceList = this._model.danceLists.getBy('id', danceListId);
        let newDances: Dance[] = [];
        for (let i = 0; i < this._model.dances.length; i++) {
            for (let j = 0; j < checkedDancesId.length; j++) {
                if(this._model.dances.get(i).id == checkedDancesId[j]) {
                    newDances.push(this._model.dances.get(i));
                }
            }
        }
        //TODO созранять в другом месте, а то при создании у пустого вызывается
        danceList.dances = newDances;
        this._view.changeInfo(danceList);
    }

    removeDance(danceListId: number, dance: Dance): void {
        for (let i = 0; i < this._model.danceLists.length; i++) {
            let danceList = this._model.danceLists.get(i);
            if (danceList.id == danceListId) {
                this._model.danceLists.get(i).removeDance(dance);
                this._view.changeInfo(this._model.danceLists.get(i));
                break;
            }
        }
    }

    saveChanges(danceListId: number, updatedDanceList: DanceList): void {
        for (let i = 0; i < this._model.danceLists.length; i++) {
            let danceList = this._model.danceLists.get(i);
            if (danceList.id == danceListId) {
                console.log(danceList)
                danceList.update(updatedDanceList);
            }
        }
    }
}