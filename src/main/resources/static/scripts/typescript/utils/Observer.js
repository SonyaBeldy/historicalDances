export class ObservableList {
    constructor(...items) {
        this._observers = [];
        this._list = items;
    }
    addObserver(observer) {
        this._observers.push(observer);
        observer.update(this._list);
    }
    removeObserver(observer) {
        this._observers = this._observers.filter(item => item != observer);
    }
    notify() {
        for (let i = 0; i < this._observers.length; i++) {
            this._observers[i].update(this._list);
        }
    }
    add(item) {
        this._list.push(item);
        this.notify();
    }
    remove(item) {
        this._list = this._list.filter(el => el != item);
        this.notify();
    }
    clear() {
        this._list = [];
        this.notify();
    }
    get length() {
        return this._list.length;
    }
    get(i) {
        return this._list[i];
    }
    getBy(field, value) {
        for (let i = 0; i < this._list.length; i++) {
            if (this._list[i][field] == value) {
                return this._list[i];
            }
        }
    }
    getAll() {
        return this._list;
    }
}
