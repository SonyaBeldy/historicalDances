export class DanceListPresenter {
    constructor(view, model) {
        this._view = view;
        this._model = model;
        this._view._danceListListView.bindListItemChangeAction(this.changeInfo.bind(this));
        this._view._danceListInfoView.bindDanceDeleteAction(this.removeDance.bind(this));
        this._view._danceListListView.bindNewDanceListBtnAction(this.createNewDanceList.bind(this));
        this._view._danceListInfoView.bindDanceMenuConfirmBtnAction(this.selectDances.bind(this));
        //TODO почему если опустить вниз, то не работает
        this._view._danceListInfoView.bindSaveChangesBtnAction(this.saveChanges.bind(this));
        this._model.updateDances().then(() => {
            this._view._danceListInfoView.bindDanceMenuOpenAction(this.showDancesMenu.bind(this));
        });
        this._model.updateDanceLists().then(() => {
            this._model.danceLists.addObserver(this._view._danceListListView);
        });
    }
    createNewDanceList(newDanceList) {
        newDanceList.name = 'Новая подборка';
        this._model.danceLists.add(newDanceList);
    }
    showDancesMenu(danceListId) {
        for (let i = 0; i < this._model.danceLists.length; i++) {
            if (this._model.danceLists.get(i).id == danceListId) {
                this._view._danceListInfoView.showDancesMenu(new Set(this._model.dances.getAll()), this._model.danceLists.get(i));
                break;
            }
        }
    }
    selectDances(danceListId, checkedDancesId) {
        let danceList = this._model.danceLists.getBy('id', danceListId);
        console.log('name ' + danceList.name);
        let newDances = [];
        console.log('length ' + this._model.dances.length);
        for (let i = 0; i < this._model.dances.length; i++) {
            for (let j = 0; j < checkedDancesId.length; j++) {
                if (this._model.dances.get(i).id == checkedDancesId[j]) {
                    newDances.push(this._model.dances.get(i));
                }
            }
        }
        danceList.dances = newDances;
        this._view.changeInfo(danceList);
    }
    changeInfo(danceListId) {
        for (let i = 0; i < this._model.danceLists.length; i++) {
            if (this._model.danceLists.get(i).id == danceListId) {
                this._view.changeInfo(this._model.danceLists.get(i));
                this._view.selectListItem(i);
                break;
            }
        }
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
    saveChanges(danceListId, updatedDanceList) {
        for (let i = 0; i < this._model.danceLists.length; i++) {
            let danceList = this._model.danceLists.get(i);
            if (danceList.id == danceListId) {
                console.log(danceList);
                danceList.update(updatedDanceList);
            }
        }
    }
}
