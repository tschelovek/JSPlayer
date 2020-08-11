/**
 * Видеопроигрыватель
 */

import {videoPlayer} from "./mediaFilesCall.js";
import {
    moduleButtonVolumeDown,
    moduleButtonVolumeMute,
    moduleButtonVolumeUp,
    volumeBar,
    volumeInput,
    playerTimer,
} from "./supScript.js";

export const videoPlayerInit = () => {
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoFullscreen = document.querySelector('.video-fullscreen');

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
        volumeInput();
        volumeBar();
        moduleButtonVolumeDown();
        moduleButtonVolumeUp();
        moduleButtonVolumeMute();
        playerTimer();
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    videoPlayerInit.stop = () => {
        videoPlayer.pause();
    };
};
