import {MainPageView} from "./view/main/MainPageView.js";
import {MainPagePresenter} from "./presenters/main/main-page-presenter.js";
import {AdminPageModel} from "./admin-page-model.js";

let mainView = new MainPageView();
let model = new AdminPageModel();

new MainPagePresenter(mainView, model);