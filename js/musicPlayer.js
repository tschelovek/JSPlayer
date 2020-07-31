export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioVolume = document.querySelector('.audio-volume');
    const audioButtonVolumeDown = document.querySelector('.audio-button__volumeDown');
    const audioButtonVolumeUp = document.querySelector('.audio-button__volumeUp');
    const audioButtonVolumeMute = document.querySelector('.audio-button__volumeMute');
    let isMute = false;

    audioPlayer.volume = 0.5;

    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    let volumeBar = () => {
        audioVolume.value = audioPlayer.volume * 100;
    };

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed) {
            audioPlayer.pause();
        } else  {
            audioPlayer.play();
        }
    };

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack()
    };

    const addZero = n => n < 10 ? '0' + n : n;

    audioNavigation.addEventListener('click', event => {
        const target = event.target

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            const track = playlist[trackIndex];
            audioImg.src = `./audio/${track}.jpg`;
            audioHeader.textContent = track.toUpperCase();
        }
        volumeBar();

        if (target.classList.contains('audio-button__prev')) {
            if (trackIndex !== 0) {
                trackIndex--;
            } else {
                trackIndex = playlist.length - 1;
            }
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

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    })

    audioVolume.addEventListener('input', () => {
        audioPlayer.volume = audioVolume.value / 100;
    });

    audioButtonVolumeDown.addEventListener('click', () => {
        if (audioPlayer.volume <= 0.05) {
            audioPlayer.volume = 0;
            audioVolume.value = 0;
            return
        }
        audioPlayer.volume = (audioPlayer.volume * 100 - 5) / 100;
        volumeBar();
    });

    audioButtonVolumeUp.addEventListener('click', () => {
        if (audioPlayer.volume >= 0.95) {
            audioPlayer.volume = 1;
            audioPlayer.value = 100;
            return
        }
        audioPlayer.volume = (audioPlayer.volume * 100 + 5) / 100;
        volumeBar();
    });

    audioButtonVolumeMute.addEventListener('click', () => {
        if (audioPlayer.volume > 0) {
            isMute = audioVolume.value;
            audioPlayer.volume = 0;
            audioButtonVolumeMute.classList.add('red-icon')
        } else {
            audioPlayer.volume = isMute / 100;
            audioButtonVolumeMute.classList.remove('red-icon')
        }
        volumeBar();
    });


    musicPlayerInit.stop = () => {
        audioPlayer.pause();
    };

};
