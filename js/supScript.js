/**
 * Файл с набором функций, идентичных для разных плееров
 *
 */

import {
    radioPlayer,
    videoPlayer,
    audioPlayer,
} from "./mediaFilesCall.js";
import {
    fileVolume,
    buttonVolumeDown,
    buttonVolumeUp,
    buttonVolumeMute,
    progress,
    timePassed,
    timeTotal
} from "./index.js";

//* добавление нуля при значении таймера меньше 10
const addZero = n => n < 10 ? '0' + n : n;

const player = [radioPlayer, videoPlayer, audioPlayer];
player.forEach(item => item.volume = 0.5);


/**
 * Функции управления звуком
 */

//* Изменение громкости с помощью ползунка регулятора
export let volumeInput = () => {
    if (fileVolume === false) {
    } else {
        fileVolume.addEventListener('input', () => {
            for (let k = 0; k < player.length; k++) {
                player[k].volume = fileVolume.value / 100;
            }
        })
    }
};

//* Синхронизация положения регулятора громкости с текущей громкостью файла
export let volumeBar = () => {
    if (fileVolume === false) {
    } else {
        for (let k = 0; k < player.length; k++) {
            fileVolume.value = player[k].volume * 100;
        }
    }
}

export let moduleButtonVolumeDown = () => {
    if (buttonVolumeDown === false) {
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

/**
 * Таймер
 */

export let playerTimer = () => {
    player.map((item, i) => item.addEventListener('timeupdate', () => {

        const currentTime = player[i].currentTime;
        const duration = player[i].duration;

        progress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteDuration = Math.floor(duration / 60);
        let secondsDuration = Math.floor(duration % 60);

        timePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        timeTotal.textContent = `${addZero(minuteDuration)}:${addZero(secondsDuration)}`;

        progress.addEventListener('input', () => {
            const value = progress.value;
            player[i].currentTime = (value * duration) / 100;
        })
    }));
}

//* Шкала прогресса/перемотки
// export let progressBar = () => {
//     player.forEach((item, i) =>
//         progress.addEventListener('input', () => {
//             let duration = player[i].duration;
//             let value = progress.value;
//             player[i].currentTime = (value * duration) / 100;
//             console.log(duration)
//         })
//     )
// }


//* Шкала прогресса/перемотки
// export let progressBar = () => {
//     progress.addEventListener('input', () => {
//         let value = progress.value;
//         for (let k = 0; k < player.length; k++) {
//             let duration = player[k].duration;
//
//             console.log(value)
//             player[k].currentTime = (value * duration) / 100;
//         }
//         playerTimer()
//     })
//     // }
// }


// export let progressBar = () => {
//     player.map((item, i) => item.progress.addEventListener('input', () => {
//
//         const duration = player[i].duration;
//         const value = progress.value;
//         player[i].currentTime = (value * duration) / 100;
//     }));
// }
//
