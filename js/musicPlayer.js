/**
 * Проигрыватель аудиофайлов
 */

import {audioPlayer} from "./mediaFilesCall.js";
import {
    moduleButtonVolumeDown,
    moduleButtonVolumeMute,
    moduleButtonVolumeUp,
    volumeBar,
    volumeInput,
    playerTimer,
} from "./supScript.js";

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');

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
            moduleButtonVolumeMute();
            playerTimer();
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

    musicPlayerInit.stop = () => {
        audioPlayer.pause();
    };
};
