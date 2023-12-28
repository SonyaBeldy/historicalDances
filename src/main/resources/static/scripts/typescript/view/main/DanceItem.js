export class DanceItem {
    constructor(dance) {
        this.$html = document.createElement('div');
        //TODO добавить сложности
        this.$html.innerHTML =
            `<div class="video-div">
                <iframe class="video"
                    src="${dance.videoLink}">
                </iframe>
             </div>
            
            <div>
                <div></div> 
                <span>${dance.name}</span>
            </div>`;
    }
}
