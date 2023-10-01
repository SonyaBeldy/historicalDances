class EditMenu2 {
    _menuHtml;
    open() {
        throw new Error('Call not implemented method');
    }
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

class TextEditMenu extends EditMenu2 {
    _obj;
    _fieldToChange;
    constructor() {
        super();
        if(TextEditMenu._instance) {
            return TextEditMenu._instance;
        }
        TextEditMenu._instance = this;
        this._menuHtml = document.getElementById('edit-menu');
        this._textAreaHtml = document.getElementById('textarea');
        this._cancelBtnHtml = document.getElementById('cancel');
        this._submitBtnHtml = document.getElementById('submit');

        this._cancelBtnHtml.addEventListener('click', ev => {
            this._hide();
        });
        this._submitBtnHtml.addEventListener('click', ev => {
            this._obj[this._fieldToChange] = this._textAreaHtml.value;
            this._hide();
        });

    }
    open(nameTableDataHtml, obj, fieldToChange) {
        this._obj = obj;
        this._fieldToChange = fieldToChange;
        this._textAreaHtml.value = obj[fieldToChange];
        this._updatePosition(nameTableDataHtml);
        this._show();
    }
}

class DateEditMenu extends EditMenu2 {

    open(dateTableDataHtml, data) {
        super.open();
        xCal(dateTableDataHtml, {lang: 'ru', fn: (date, ob) => {
            data.date = DateTimeConverter.xCalDateToDate(date, data.date);
            }});
    }
}

class TimeEditMenu extends EditMenu2 {
    static _instance;
    _data;
    constructor() {
        if(TimeEditMenu._instance != null) {
            return TimeEditMenu._instance;
        }
        super();
        TimeEditMenu._instance = this;
        this._menuHtml = document.getElementById('time-edit-menu');
        this._cancelBtnHtml = document.getElementById('time-close-btn');
        this._submitBtnHtml = document.getElementById('time-submit-btn');
        this._hourSelectHtml = document.getElementById('hour-select');
        this._minutesSelectHtml = document.getElementById('minutes-select');

        this._cancelBtnHtml.addEventListener('click', ev => {
            this._hide();
        })
        this._submitBtnHtml.addEventListener('click', ev => {
            let hour = this._hourSelectHtml.value;
            let minutes = this._minutesSelectHtml.value;
            this._data.date = DateTimeConverter.customTimeToDate(this._data.date, hour, minutes);
            this._hide();
        })
    }
    open(timeTableDateHtml, data) {
        super.open();
        this._data = data;
        this._updatePosition(timeTableDateHtml);
        this._show();
    }

}
