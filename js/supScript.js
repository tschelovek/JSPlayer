/**
 * Volume module
 */

import {radioPlayer} from "./variablesCall.js";
import {videoPlayer} from "./variablesCall.js";
import {audioPlayer} from "./variablesCall.js";
import {fileVolume} from "./index.js";
import {buttonVolumeDown} from "./index.js";
import {buttonVolumeUp} from "./index.js";
import {buttonVolumeMute} from "./index.js";

export const addZero = n => n < 10 ? '0' + n : n;

const player = [radioPlayer, videoPlayer, audioPlayer];
player.forEach(item => item.volume = 0.5)

export let volumeInput = () => {
    if (fileVolume === false) {
        volumeInput = false;
    } else {
        fileVolume.addEventListener('input', () => {
            for (let k = 0; k < player.length; k++) {
                player[k].volume = fileVolume.value / 100;
            }
        })
    }
};

export let volumeBar = () => {
    for (let k = 0; k < player.length; k++) {
        fileVolume.value = player[k].volume * 100;
    }
}

export let moduleButtonVolumeDown = () => {
    if (buttonVolumeDown === false) {
        moduleButtonVolumeDown = false;
    } else {
        buttonVolumeDown.addEventListener('click', () => {
            for (let k = 0; k < player.length; k++) {
                if (player[k].volume <= 0.05) {
                    player[k].volume = 0;
                    fileVolume.value = 0;
                    return
                }
                player[k].volume = (player[k].volume * 100 - 5) / 100;
                volumeBar();
            }
        })
    }
};

export let moduleButtonVolumeUp = () => {
    if (buttonVolumeUp === false) {
        moduleButtonVolumeDown = false;
    } else {
        buttonVolumeUp.addEventListener('click', () => {
            for (let k = 0; k < player.length; k++) {
                if (player[k].volume >= 0.95) {
                    player[k].volume = 1;
                    fileVolume.value = 100;
                    return
                }
                player[k].volume = (player[k].volume * 100 + 5) / 100;
                volumeBar();
            }
        })
    }
};

let isMute = false;

export let moduleButtonVolumeMute = () => {
    if (buttonVolumeMute === false) {
        moduleButtonVolumeDown = false;
    } else {
        buttonVolumeMute.addEventListener('click', () => {
            for (let k = 0; k < player.length; k++) {
                if (player[k].volume > 0) {
                    isMute = fileVolume.value;
                    player[k].volume = 0;
                    buttonVolumeMute.classList.add('red-icon')
                } else {
                    player[k].volume = isMute / 100;
                    buttonVolumeMute.classList.remove('red-icon')
                }
                volumeBar();
            }
        })
    }
};

