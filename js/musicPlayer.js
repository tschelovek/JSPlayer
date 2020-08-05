/**
 * Проигрыватель аудиофайлов
 */

import {audioPlayer} from "./mediaFilesCall.js";
import {
    addZero,
    moduleButtonVolumeDown,
    moduleButtonVolumeMute,
    moduleButtonVolumeUp,
    volumeBar,
    volumeInput
} from "./supScript.js";

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        isPlayed ? audioPlayer.pause() : audioPlayer.play();
    };

    const nextTrack = () => {
        trackIndex === playlist.length - 1 ? trackIndex = 0 : trackIndex++;
        loadTrack()
    };

    audioNavigation.addEventListener('click', event => {
        const target = event.target

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();

            const track = playlist[trackIndex];
            audioImg.src = `./audio/${track}.jpg`;
            audioHeader.textContent = track.toUpperCase();

            volumeInput();
            volumeBar();
            moduleButtonVolumeDown();
            moduleButtonVolumeUp();
            moduleButtonVolumeMute()
        }

        if (target.classList.contains('audio-button__prev')) {
            trackIndex !== 0 ? trackIndex-- : trackIndex = playlist.length - 1;
            loadTrack()
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack()
        }
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    //* Таймер
    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;
        audioProgressTiming.style.width = progress + '%';

        let minutePassed = Math.floor(currentTime / 60) || '0';
        let secondsPassed = Math.floor(currentTime % 60) || '0';

        let minuteDuration = Math.floor(duration / 60) || '0';
        let secondsDuration = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`
        audioTimeTotal.textContent = `${addZero(minuteDuration)}:${addZero(secondsDuration)}`
    });

    //* Шкала прогресса/перемотки
    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        audioPlayer.currentTime = (x / allWidth) * audioPlayer.duration;
    });

    musicPlayerInit.stop = () => {
        audioPlayer.pause();
    };
};
