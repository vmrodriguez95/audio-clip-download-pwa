const media = {
    getElements: column => {
        const audio = column.querySelector('audio');
        const controller = column.querySelector('[data-app="audio-controller"]');

        return {audio, controller};
    },

    isPaused: audio => audio.paused,

    showIcon: icon => icon.setAttribute('aria-hidden', 'false'),

    hideIcon: icon => icon.setAttribute('aria-hidden', 'true'),

    showPlayIcon: button => (media.showIcon(button.children[0], media.hideIcon(button.children[1]))),

    showPauseIcon: button => (media.hideIcon(button.children[0], media.showIcon(button.children[1]))),

    pauseAudio: elements => elements.audio.pause(),

    playAudio: elements => elements.audio.play(),

    pausePlayedAudios: () => [...document.querySelectorAll('[data-app="pause"][aria-hidden="false"]')].forEach(icon => media.pauseAudio(media.getElements(icon.closest('[data-app="column"]')))),

    handler: elements => media.isPaused(elements.audio) ? (media.pausePlayedAudios(), media.playAudio(elements)) : media.pauseAudio(elements),
    
    resetAudio: elements => (elements.audio.currentTime = 0, media.showPlayIcon(elements.controller)),

    bind: column => {
        let elements = media.getElements(column);
        
        elements.controller.addEventListener('click', () => media.handler(elements));

        elements.audio.addEventListener('play', () => media.showPauseIcon(elements.controller));
        elements.audio.addEventListener('pause', () => media.showPlayIcon(elements.controller));
        elements.audio.addEventListener('ended', () => media.resetAudio(elements.controller));
    }
}

export default media;