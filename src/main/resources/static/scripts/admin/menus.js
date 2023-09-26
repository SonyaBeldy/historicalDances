class EditMenu2 {
    _menuHtml;

    constructor() {}
    open() {}
    _updatePosition(refElement) {
        let rec = refElement.getBoundingClientRect();
        this._menuHtml.style.left = rec.left + "px";
        this._menuHtml.style.top = (rec.top) + "px";
    }
    _show() {
        this._menuHtml.style.display = 'flex';
    }

    _hide() {
        this._menuHtml.style.display = 'none';
    }
}

class NameEditMenu extends EditMenu2 {
    static _instance;
    _obj;
    constructor() {
        if(NameEditMenu._instance != null) {
            return NameEditMenu._instance;
        }
        super();
        NameEditMenu._instance = this;
        this._menuHtml = document.getElementById('edit-menu');
        this._textAreaHtml = document.getElementById('textarea');
        this._cancelBtnHtml = document.getElementById('cancel');
        this._submitBtnHtml = document.getElementById('submit');

        this._cancelBtnHtml.addEventListener('click', ev => {
            this._hide();
        });
        this._submitBtnHtml.addEventListener('click', ev => {
            console.log(this._obj);
            this._obj.name = this._textAreaHtml.value;
            console.log(this._obj);
            this._hide();
        });

    }

    open(nameTableDataHtml, obj) {
        this._obj = obj;
        this._textAreaHtml.textContent = obj.name;
        this._updatePosition(nameTableDataHtml);
        this._show();
    }




}
