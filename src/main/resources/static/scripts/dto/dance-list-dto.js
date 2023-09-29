class DanceListDto {
    constructor(id, name, date, desc) {
        this._id = id;
        this._name = name;
        this._date = date;
        this._desc = desc;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get date() {
        return this._date;
    }

    get desc() {
        return this._desc;
    }
}