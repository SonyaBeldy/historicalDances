import {Observer} from "../utils/Observer";

export class Dance {
    private readonly _id: number;
    private _name: string;
    private _danceType: string;
    private _videoLink: string;
    private _desc: string;
    private _difficulty: number;

    private _observers: Observer<Dance>[];
    constructor(id: number, name: string, danceType: string, videoLink: string, desc: string, difficulty: number) {
        this._observers = [];

        this._id = id;
        this._name = name;
        this._danceType = danceType;
        this._videoLink = videoLink;
        this._desc = desc;
        this._difficulty = difficulty;
    }

    public addObserver(observer: Observer<Dance>): void {
        this._observers.push(observer);
    }

    public removeObserver(observer: Observer<Dance>): void {
        this._observers = this._observers.filter(element => element != observer);
    }

    private _notify(): void {
        for (let i = 0; i < this._observers.length; i++) {
            this._observers[i].update(this);
        }
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
        this._notify();
    }

    get danceType(): string {
        return this._danceType;
    }

    set danceType(value: string) {
        this._danceType = value;
        this._notify();
    }

    get videoLink(): string {
        return this._videoLink;
    }

    set videoLink(value: string) {
        this._videoLink = value;
        this._notify()
    }

    get desc(): string {
        return this._desc;
    }

    set desc(value: string) {
        this._desc = value;
        this._notify()
    }

    get difficulty(): number {
        return this._difficulty;
    }

    set difficulty(value: number) {
        this._difficulty = value;
        this._notify()
    }
}