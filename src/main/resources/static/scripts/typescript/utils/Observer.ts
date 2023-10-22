export interface Observer<T> {
    update(element: T): void;
}

export class ObservableList<T> {
    private _list: T[];
    private _observers: Observer<T[]>[];

    constructor(...items: T[]) {
        this._observers = [];
        this._list = items;
    }

    public addObserver(observer: Observer<T[]>) {
        this._observers.push(observer);
        observer.update(this._list);
    }

    public removeObserver(observer: Observer<T[]>) {
        this._observers = this._observers.filter(item => item != observer);
    }
    private notify(): void {
        for (let i = 0; i < this._observers.length; i++) {
            this._observers[i].update(this._list);
        }
    }
    public add(item: T) {
        this._list.push(item);
        this.notify();
    }

    public remove(item: T) {
        this._list = this._list.filter(el => el != item);
        this.notify();
    }

    public clear() {
        this._list = [];
        this.notify();
    }

    get length() {
        return this._list.length;
    }

    get (i: number) {
        return this._list[i];
    }
}


