export class MainPagePresenter {
    constructor(view, model) {
        model.updateDances().then(() => {
            view.dancesGreed.update(model.dances.getAll());
        });
    }
}
