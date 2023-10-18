import {Observer} from "../utils/Observer.js";

export class DanceType {
    private readonly _id: number;
    private _name: string;

    private _observers: Observer<DanceType>[];
    constructor(id: number, name: string) {
        this._observers = [];

        this._id = id;
        this._name = name;
    }

    public addObserver(observer: Observer<DanceType>): void {
        this._observers.push(observer);
    }

    public removeObserver(observer: Observer<DanceType>) {
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
}