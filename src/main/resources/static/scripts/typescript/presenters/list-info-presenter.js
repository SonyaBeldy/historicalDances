export class DanceListPresenter {
    constructor(view, model) {
        this._view = view;
        this._model = model;
        this._view._danceListListView.bindListItemChangeAction(this.changeInfo.bind(this));
        this._model.updateDanceLists().then(() => {
            this._model.danceLists.addObserver(this._view._danceListListView);
        });
    }
    changeInfo(danceListId) {
        console.log('changeInfo');
        for (let i = 0; i < this._model.danceLists.length; i++) {
            if (this._model.danceLists.get(i).id == danceListId) {
                this._view.changeInfo(this._model.danceLists.get(i));
                break;
            }
        }
    }
}
