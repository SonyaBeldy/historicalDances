export class DanceMenuView {
    constructor() {
        this.dances = new BiMap();
        this.$html = document.getElementById('dances-menu-back');
        // this.$html = document.createElement('div');
        // this.$html.innerHTML =
        //     `<div id="dances-from-dance-list-menu" class="creating-menu gap-10 jost">
        //         <div class="flex-row space-between">
        //             <span class="jost">Выбрать танцы</span>
        //             <button id="close-dance-menu-btn" class="btn-img">
        //                 <img src="../../images/btns/close-16.png">
        //             </button>
        //         </div>
        //         <input type="search">
        //         <ul class="flex-column gap-5">
        //         </ul>
        //         <button class="button" id="dances-from-dance-list-menu-confirm-btn">Выбрать</button>
        //     </div>`;
        // this.$html.classList.add('popup-menu-background');
        this.$ul = this.$html.querySelector('ul');
        [this.$close, this.$confirm] = this.$html.querySelectorAll('button');
        this.$close.addEventListener('click', ev => {
            this.hide();
        });
        this.$confirm.addEventListener('click', ev => {
        });
    }
    show() {
        this.$html.classList.remove('hided');
    }
    hide() {
        this.$html.classList.add('hided');
    }
    fill(allDances, selectedDances) {
        this.dances.clear();
        this.$ul.innerHTML = '';
        for (let i = 0; i < allDances.length; i++) {
            // let li = new HTMLLIElement();
            let li = document.createElement('li');
            li.innerHTML =
                `<input type="checkbox" class="input" name="dances">
                 <span>${allDances[i].name}</span>`;
            li.classList.add('flex-row', 'gap-5');
            this.$ul.appendChild(li);
            this.dances.set(allDances[i], li);
        }
        this.setChecked(selectedDances);
    }
    setChecked(selectedDances) {
        this.clearChecked();
        for (let i = 0; i < selectedDances.length; i++) {
            let li = this.dances.getByKey(selectedDances[i]);
            li.querySelector('input').checked = true;
        }
    }
    clearChecked() {
        let dancesHTML = this.dances.m1.values();
        for (const dance of dancesHTML) {
            dance.querySelector('input').checked = false;
        }
    }
    getCheckedDances() {
        let checkedDances = [];
        let dancesHTML = this.dances.m1.values();
        for (const dance of dancesHTML) {
            if (dance.querySelector('input').checked) {
                checkedDances.push(this.dances.getByValue(dance));
            }
        }
        return checkedDances;
    }
    bindConfirmBtnAction(action) {
        this.$confirm.addEventListener('click', ev => {
            action(this.getCheckedDances());
        });
    }
}
export class BiMap {
    constructor() {
        this.m1 = new Map();
        this.m2 = new Map();
    }
    getByKey(key) {
        return this.m1.get(key);
    }
    getByValue(value) {
        return this.m2.get(value);
    }
    set(key, value) {
        this.m1.set(key, value);
        this.m2.set(value, key);
    }
    clear() {
        this.m1.clear();
        this.m2.clear();
    }
    size() {
        return this.m1.size;
    }
}
