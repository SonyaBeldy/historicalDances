import {MainPageView} from "../../view/main/MainPageView.js";
import {AdminPageModel} from "../../admin-page-model.js";

export class MainPagePresenter {

    constructor(view: MainPageView, model: AdminPageModel) {

        model.updateDances().then(() => {
            view.dancesGreed.update(model.dances.getAll());
        });
    }
}