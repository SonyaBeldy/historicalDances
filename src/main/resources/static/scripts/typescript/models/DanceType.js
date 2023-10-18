export class DanceType {
    constructor(id, name) {
        this._observers = [];
        this._id = id;
        this._name = name;
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
}
