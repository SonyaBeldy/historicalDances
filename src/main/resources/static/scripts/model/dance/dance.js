class DanceData {
    _observers = [];

    constructor(id, name, danceType, videoLink, desc, difficulty) {
        this._id = id;
        this._name = name;
        this._danceType = danceType;
        this._videoLink = videoLink;
        this._desc = desc;
        this._difficulty = difficulty;
    }

    _update() {
        for (let i = 0; i < this._observers.length; i++) {
            this._observers[i].update(this);
        }
    }

    addObserver(observer) {
        this._observers.push(observer);
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
        this._update();
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
        this._update();
    }

    get danceType() {
        return this._danceType;
    }

    set danceType(value) {
        this._danceType = value;
        this._update();
    }

    get videoLink() {
        return this._videoLink;
    }

    set videoLink(value) {
        this._videoLink = value;
        this._update();
    }

    get desc() {
        return this._desc;
    }

    set desc(value) {
        this._desc = value;
        this._update();
    }

    get difficulty() {
        return this._difficulty;
    }

    set difficulty(value) {
        this._difficulty = value;
        this._update();
    }
}

class DanceTableRow {
    constructor(dance) {
        this._dance = dance;
        this._dance.addObserver(this);

        this._nameHtml = document.createElement('td');
        this._typeHtml = document.createElement('td');
        this._videoLinkHtml = document.createElement('td');
        this._descHtml = document.createElement('td');
        this._difficultyHtml = document.createElement('td');

        this._rowHtml = document.createElement('tr');

        this.update(this._dance);

        this._rowHtml.appendChild(this._nameHtml);
        this._rowHtml.appendChild(this._typeHtml);
        this._rowHtml.appendChild(this._videoLinkHtml);
        this._rowHtml.appendChild(this._descHtml);
        this._rowHtml.appendChild(this._difficultyHtml);
    }

    update(dance) {
        this._nameHtml.textContent = dance.name;
        this._typeHtml.textContent = dance.danceType;
        this._videoLinkHtml.textContent = dance.videoLink;
        this._descHtml.textContent = dance.desc;
        this._difficultyHtml.textContent = dance.difficulty;
    }

    get rowHtml() {
        return this._rowHtml;
    }
}

class DanceOnServer {

    constructor(dance) {
        dance.addObserver(this);
    }

    async update(dance) {
        await patch('dance/update', Mapper.toDanceDTOJson(dance));
    }
}