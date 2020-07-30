export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');
    const radioButtonVolumeDown = document.querySelector('.radio-button__volumeDown');
    const radioButtonVolumeUp = document.querySelector('.radio-button__volumeUp');
    const radioButtonVolumeMute = document.querySelector('.radio-button__volumeMute');
    let isMute = false;

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const changeIconPlay = () =>  {
        if (audio.paused) {
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

    let volumeBar = () => {
        radioVolume.value = audio.volume * 100;
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
        audio.src = target.dataset.radioStantion;

        audio.play();
        changeIconPlay();
        volumeBar();
    });

    radioStop.addEventListener('click', () => {
        if(audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
    });

    radioButtonVolumeDown.addEventListener('click', () => {
        if (audio.volume <= 0.05) {
            audio.volume = 0;
            radioVolume.value = 0;
            return
        }
        audio.volume = (audio.volume * 100 - 5) / 100;
        volumeBar();
    });

    radioButtonVolumeUp.addEventListener('click', () => {
        if (audio.volume >= 0.95) {
            audio.volume = 1;
            audio.value = 100;
            return
        }
        audio.volume = (audio.volume * 100 + 5) / 100;
        volumeBar();
    });

    radioButtonVolumeMute.addEventListener('click', () => {
        if (audio.volume > 0) {
            isMute = radioVolume.value;
            audio.volume = 0;
            radioButtonVolumeMute.classList.add('red-icon')
        } else {
            audio.volume = isMute / 100;
            radioButtonVolumeMute.classList.remove('red-icon')
        }
        volumeBar();
    });

    audio.volume = 0.5;

};
