import {AdminPageView} from "./view";
import {AdminPageModel} from "./admin-page-model";

export class AdminPagePresenter {
    private _view: AdminPageView;
    private _model: AdminPageModel;
    constructor(view: AdminPageView, model: AdminPageModel) {
        this._view = view;
        this._model = model;
        this._view.bindChangeTableAction(this.changeTable.bind(this));
    }

    async changeTable(tableType: number) {
        switch (tableType) {
            case 1:
                await this._model.updateDanceLists();
                this._model.danceLists.addObserver(this._view.danceListsTableView);
                this._view.changeTable(this._view.danceListsTableView);
                break;
            case 2:
                await this._model.updateDances();
                this._model.dances.addObserver(this._view.dancesTableView); //todo  а где добавляются наблюдатели строк
                this._view.changeTable(this._view.dancesTableView);
                break;
            case 3:
                await this._model.updateDanceTypes();
                this._model.danceTypes.addObserver(this._view.danceTypesTableView);
                this._view.changeTable(this._view.danceTypesTableView);
                break;
        }
    }
}