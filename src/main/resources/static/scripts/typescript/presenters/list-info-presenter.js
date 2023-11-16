export class DanceListPresenter {
    constructor(view, model) {
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
        this._model.updateDanceLists().then(() => {
            this._model.danceLists.addObserver(this._view._danceListListView);
        });
    }
    changeInfo(danceList) {
        this._view.changeInfo(danceList);
        this._view.selectListItem(danceList);
        this._view._danceListInfoView.bindSaveChangesBtnAction(this.saveChanges.bind(this));
    }
    changeInfoForNewDanceList(newDanceList) {
        newDanceList.name = 'Новая подборка';
        //todo: why list duplicated
        // this._model.danceLists.add(newDanceList);
        this._view.changeInfo(newDanceList);
        this._view.selectNewDanceBtn();
        this._view._danceListInfoView.bindSaveChangesBtnAction(this.createNewDanceList.bind(this));
    }
    createNewDanceList(danceListId, newDanceList) {
        this._model.danceLists.add(newDanceList);
    }
    generateDancesInDanceMenu(danceList) {
        this._view._danceListInfoView.generateDancesInDanceMenu(this._model.dances.getAll(), danceList);
    }
    selectDances(danceList, checkedDancesId) {
        // let danceList = this._model.danceLists.getBy('id', danceListId);
        let newDances = [];
        for (let i = 0; i < this._model.dances.length; i++) {
            for (let j = 0; j < checkedDancesId.length; j++) {
                if (this._model.dances.get(i).id == checkedDancesId[j]) {
                    newDances.push(this._model.dances.get(i));
                }
            }
        }
        //TODO созранять в другом месте, а то при создании у пустого вызывается
        danceList.dances = newDances;
        this._view.changeInfo(danceList);
    }
    removeDance(danceListId, dance) {
        for (let i = 0; i < this._model.danceLists.length; i++) {
            let danceList = this._model.danceLists.get(i);
            if (danceList.id == danceListId) {
                this._model.danceLists.get(i).removeDance(dance);
                this._view.changeInfo(this._model.danceLists.get(i));
                break;
            }
        }
    }
    saveChanges(danceList, updatedDanceList) {
        danceList.update(updatedDanceList);
    }
}
