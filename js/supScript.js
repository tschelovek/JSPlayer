/**
 * Volume module
 */


import {radioPlayer} from "./variablesCall.js";
import {videoPlayer} from "./variablesCall.js";
import {audioPlayer} from "./musicPlayer.js";

export const addZero = n => n < 10 ? '0' + n : n;

// const player = [radioPlayer, videoPlayer, audioPlayer];

// let currentFile = document.getElementsByClassName(':active');
// export const volumeBar = () => {
//     fileVolume.value = radioPlayer.volume * 100;
//     // fileVolume[1].value = videoPlayer.volume * 100;
// }
// export let fileVolume = document.getElementsByClassName('player-block:active.volume');
// console.log(fileVolume)


// fileVolume.addEventListener('input', () => {
//     for (let k = 0; k < player.length; k++) {
//         player[k].volume = fileVolume.value / 100;
//     }
// });
//
// fileVolume.forEach((fileVolumeInpt, i) => fileVolumeInpt.addEventListener('input', () => {
//     for (let k = 0; k < player.length; k++) {
//         player[k].volume = fileVolume[i].value / 100;
//     }
// }));

// console.log(fileVolume)
//

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
