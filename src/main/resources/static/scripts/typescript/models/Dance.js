export class Dance {
    constructor(id, name, danceType, videoLink, desc, difficulty) {
        this._observers = [];
        this._id = id;
        this._name = name;
        this._danceType = danceType;
        this._videoLink = videoLink;
        this._desc = desc;
        this._difficulty = difficulty;
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
    get danceType() {
        return this._danceType;
    }
    set danceType(value) {
        this._danceType = value;
        this._notify();
    }
    get videoLink() {
        return this._videoLink;
    }
    set videoLink(value) {
        this._videoLink = value;
        this._notify();
    }
    get desc() {
        return this._desc;
    }
    set desc(value) {
        this._desc = value;
        this._notify();
    }
    get difficulty() {
        return this._difficulty;
    }
    set difficulty(value) {
        this._difficulty = value;
        this._notify();
    }
}
