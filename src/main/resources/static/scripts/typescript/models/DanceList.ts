import {Observer} from "../utils/Observer";
import {Dance} from "./Dance";

export class DanceList {
    private readonly _id: number;
    private _name: string;
    private _date: Date;
    private _desc: string;

    private _observers: Observer<DanceList>[];
    private _dances: Dance[];
    constructor(id: number, name: string, date: Date, desc: string, dances: Dance[]) {
        this._dances = dances;
        this._observers = [];

        this._id = id;
        this._name = name;
        this._date = date;
        this._desc = desc;
    }

    public addObserver(observer: Observer<DanceList>) {
        this._observers.push(observer);
        observer.update(this);
    }
    public removeObserver(observer: Observer<DanceList>) {
        this._observers = this._observers.filter(element => element != observer);
    }

    private _notify() {
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

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
        this._notify();
    }

    get desc(): string {
        return this._desc;
    }

    set desc(value: string) {
        this._desc = value;
        this._notify();
    }

    public addDance(dance: Dance) {
        this._dances.push(dance);
        this._notify();
    }
    public removeDance(dance: Dance) {
        this._dances = this._dances.filter(el => el.id != dance.id);//если у лямбды убрать {}, то результат выражения вернеться без return
        this._notify();
    }
    get dances(): Dance[] {
        return this._dances;
    }

    set dances(value: Dance[]) {
        this._dances = value;
        this._notify();
    }

    has(dance: Dance) {
        for (let d of this._dances) {
            if(d.id == dance.id) {
                return true;
            }
        }
        return false;
    }

    update(updatedDanceList: DanceList) {
        if (this._name != updatedDanceList.name) {
            this.name = updatedDanceList.name;
        }
        if (this._date != updatedDanceList.date) {
            this.date = updatedDanceList.date;
        }
        if (this._desc != updatedDanceList.desc) {
            this.desc = updatedDanceList.desc;
        }
        this.dances = updatedDanceList.dances;
    }
}