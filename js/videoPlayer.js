/**
 * Видеопроигрыватель
 */

import {videoPlayer} from "./mediaFilesCall.js";
import {
    addZero,
    moduleButtonVolumeDown,
    moduleButtonVolumeMute,
    moduleButtonVolumeUp,
    volumeBar,
    volumeInput,
} from "./supScript.js";

export const videoPlayerInit = () => {
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
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

    //* Таймер
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteDuration = Math.floor(duration / 60);
        let secondsDuration = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteDuration)}:${addZero(secondsDuration)}`;
    });

    //* Шкала прогресса/перемотки
    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;
        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    videoPlayerInit.stop = () => {
        videoPlayer.pause();
    };
};
