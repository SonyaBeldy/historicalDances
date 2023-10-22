var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DanceListPresenter } from "./presenters/list-info-presenter.js";
export class AdminPagePresenter {
    constructor(view, model) {
        this._view = view;
        this._model = model;
        this._view.bindChangeTableAction(this.changeTable.bind(this));
        new DanceListPresenter(this._view.danceListView, this._model);
    }
    changeTable(tableType) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (tableType) {
                case 1:
                    yield this._model.updateDanceLists();
                    this._model.danceLists.addObserver(this._view.danceListsTableView);
                    this._view.changeTable(this._view.danceListsTableView);
                    // this._model.danceLists.addObserver(this._view.danceListListView);
                    this._view.danceListView.changeList(this._view.danceListView._danceListListView);
                    break;
                case 2:
                    yield this._model.updateDances();
                    this._model.dances.addObserver(this._view.dancesTableView); //todo  а где добавляются наблюдатели строк
                    this._view.changeTable(this._view.dancesTableView);
                    break;
                case 3:
                    yield this._model.updateDanceTypes();
                    this._model.danceTypes.addObserver(this._view.danceTypesTableView);
                    this._view.changeTable(this._view.danceTypesTableView);
                    break;
            }
        });
    }
}
