/**
 * Videoplayer module
 */


import {videoPlayer} from "./variablesCall.js";
import {fileVolume} from "./supScript.js";

import {addZero} from "./supScript.js";

export const videoPlayerInit = () => {
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoFullscreen = document.querySelector('.video-fullscreen');
    const videoButtonVolumeDown = document.querySelector('.video-button__volumeDown');
    const videoButtonVolumeUp = document.querySelector('.video-button__volumeUp');
    const videoButtonVolumeMute = document.querySelector('.video-button__volumeMute');
    let isMute = false;

    videoPlayer.volume = 0.5;

    fileVolume.value = videoPlayer.volume * 100;

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
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    let volumeBar = () => {
        videoVolume.value = videoPlayer.volume * 100;
    };

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

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

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    // fileVolume.addEventListener('input', () => {
    //     videoPlayer.volume = fileVolume.value / 100;
    // });
    //
    // videoButtonVolumeDown.addEventListener('click', () => {
    //     if (videoPlayer.volume <= 0.05) {
    //         videoPlayer.volume = 0;
    //         fileVolume.value = 0;
    //         return
    //     }
    //     videoPlayer.volume = (videoPlayer.volume * 100 - 5) / 100;
    //     volumeBar();
    // });
    //
    // videoButtonVolumeUp.addEventListener('click', () => {
    //     if (videoPlayer.volume >= 0.95) {
    //         videoPlayer.volume = 1;
    //         fileVolume.value = 100;
    //         return
    //     }
    //     videoPlayer.volume = (videoPlayer.volume * 100 + 5) / 100;
    //     volumeBar();
    // });
    //
    // videoButtonVolumeMute.addEventListener('click', () => {
    //     if (videoPlayer.volume > 0) {
    //         isMute = fileVolume.value;
    //         videoPlayer.volume = 0;
    //         videoButtonVolumeMute.classList.add('red-icon')
    //     } else {
    //         videoPlayer.volume = isMute / 100;
    //         videoButtonVolumeMute.classList.remove('red-icon')
    //     }
    //     volumeBar();
    // });

    videoPlayerInit.stop = () => {
        videoPlayer.pause();
    };


};
