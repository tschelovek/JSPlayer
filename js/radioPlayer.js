import {radioPlayer} from "./variablesCall.js";
import {volumeBar} from "./supScript.js";
import {fileVolume} from "./supScript.js";

export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioButtonVolumeDown = document.querySelector('.radio-button__volumeDown');
    const radioButtonVolumeUp = document.querySelector('.radio-button__volumeUp');
    const radioButtonVolumeMute = document.querySelector('.radio-button__volumeMute');

    let isMute = false;
    radioPlayer.type = 'mediaFile/aac';

    radioStop.disabled = true;

    const changeIconPlay = () =>  {
        if (radioPlayer.paused) {
            radio.classList.remove('play')
            radioStop.classList.remove('fa-stop');
            radioStop.classList.add('fa-play');
        } else {
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
            radio.classList.add('play')
        };
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    radioPlayer.volume = 0.5;

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
        volumeBar();
    });

    radioStop.addEventListener('click', () => {
        if(radioPlayer.paused) {
            radioPlayer.play();
        } else {
            radioPlayer.pause();
        }
        changeIconPlay();
    });

    // fileVolume.addEventListener('input', () => {
    //     mediaFile.volume = fileVolume.value / 100;
    // });
    //
    // radioButtonVolumeDown.addEventListener('click', () => {
    //     if (mediaFile.volume <= 0.05) {
    //         mediaFile.volume = 0;
    //         fileVolume.value = 0;
    //         return
    //     }
    //     mediaFile.volume = (mediaFile.volume * 100 - 5) / 100;
    //     volumeBar();
    // });
    //
    // radioButtonVolumeUp.addEventListener('click', () => {
    //     if (mediaFile.volume >= 0.95) {
    //         mediaFile.volume = 1;
    //         mediaFile.value = 100;
    //         return
    //     }
    //     mediaFile.volume = (mediaFile.volume * 100 + 5) / 100;
    //     volumeBar();
    // });
    //
    // radioButtonVolumeMute.addEventListener('click', () => {
    //     if (mediaFile.volume > 0) {
    //         isMute = fileVolume.value;
    //         mediaFile.volume = 0;
    //         radioButtonVolumeMute.classList.add('red-icon')
    //     } else {
    //         mediaFile.volume = isMute / 100;
    //         radioButtonVolumeMute.classList.remove('red-icon')
    //     }
    //     volumeBar();
    // });

    radioPlayerInit.stop = () => {
        radioPlayer.pause();
        changeIconPlay();
    };

};
