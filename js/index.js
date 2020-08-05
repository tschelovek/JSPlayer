import {radioPlayerInit} from "./radioPlayer.js";
import {musicPlayerInit} from "./musicPlayer.js";
import {videoPlayerInit} from "./videoPlayer.js";
export let fileVolume = false;
export let buttonVolumeDown = false;
export let buttonVolumeUp = false;
export let buttonVolumeMute = false;

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp')

const deactivationPlayer = () => {
    temp.style.display = 'none'
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));

    musicPlayerInit.stop();
    videoPlayerInit.stop();
    radioPlayerInit.stop();
};

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
    deactivationPlayer()
    btn.classList.add('active');
    playerBlock[i].classList.add('active');

    let activePlayer = document.querySelector('.player-block.active');

    fileVolume = activePlayer.querySelector('.volume');
    buttonVolumeDown = activePlayer.querySelector('.button__volumeDown');
    buttonVolumeUp = activePlayer.querySelector('.button__volumeUp');
    buttonVolumeMute = activePlayer.querySelector('.button__volumeMute');
}));

radioPlayerInit();
videoPlayerInit();
musicPlayerInit();
