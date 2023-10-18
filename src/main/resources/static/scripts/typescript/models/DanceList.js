export class DanceList {
    constructor(id, name, date, desc) {
        this._observers = [];
        this._id = id;
        this._name = name;
        this._date = date;
        this._desc = desc;
    }
    addObserver(observer) {
        this._observers.push(observer);
    }
    removeObserver(observer) {
        this._observers = this._observers.filter(element => element != observer);
    }
    _notify() {
        for (let i = 0; i < this._observers.length; i++) {
            this._observers[i].update(this);
        }
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
        this._notify();
    }
    get date() {
        return this._date;
    }
    set date(value) {
        this._date = value;
        this._notify();
    }
    get desc() {
        return this._desc;
    }
    set desc(value) {
        this._desc = value;
        this._notify();
    }
}
