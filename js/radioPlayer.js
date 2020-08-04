import {radioPlayer} from "./variablesCall.js";
import {volumeInput} from "./supScript.js";
import {volumeBar} from "./supScript.js";
import {moduleButtonVolumeDown} from "./supScript.js";
import {moduleButtonVolumeUp} from "./supScript.js";
import {moduleButtonVolumeMute} from "./supScript.js";
// import {fileVolume} from "./index";

export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');

    radioPlayer.type = 'mediaFile/aac';
    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (radioPlayer.paused) {
            radio.classList.remove('play')
            radioStop.classList.remove('fa-stop');
            radioStop.classList.add('fa-play');
        } else {
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
            radio.classList.add('play')
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parent = target.closest('.radio-item');
        selectItem(parent);

        const title = parent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const urlImg = parent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false;
        radioPlayer.src = target.dataset.radioStantion;

        radioPlayer.play();
        changeIconPlay();
        volumeInput();
        volumeBar();
        moduleButtonVolumeDown();
        moduleButtonVolumeUp();
        moduleButtonVolumeMute()
    });

    radioStop.addEventListener('click', () => {
        if (radioPlayer.paused) {
            radioPlayer.play();
        } else {
            radioPlayer.pause();
        }
        changeIconPlay();
    });

    radioPlayerInit.stop = () => {
        radioPlayer.pause();
        changeIconPlay();
    };
};
