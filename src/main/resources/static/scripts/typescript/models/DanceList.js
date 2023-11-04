export class DanceList {
    constructor(id, name, date, desc, dances) {
        this._dances = dances;
        this._observers = [];
        this._id = id;
        this._name = name;
        this._date = date;
        this._desc = desc;
    }
    addObserver(observer) {
        this._observers.push(observer);
        observer.update(this);
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
    addDance(dance) {
        this._dances.push(dance);
        this._notify();
    }
    removeDance(dance) {
        this._dances = this._dances.filter(el => el.id != dance.id); //если у лямбды убрать {}, то результат выражения вернеться без return
        this._notify();
    }
    get dances() {
        return this._dances;
    }
    set dances(value) {
        this._dances = value;
        this._notify();
    }
    has(dance) {
        for (let d of this._dances) {
            if (d.id == dance.id) {
                return true;
            }
        }
        return false;
    }
}
