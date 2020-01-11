const media = {
    /**
     * Obtain from column his audio player and button wich control it.
     * 
     * @function getElements
     * 
     * @param {Element} column - HTML element wich contains clip info
     * 
     * @returns {Object}
     */
    getElements: column => {
        const audio = column.querySelector('audio');
        const controller = column.querySelector('[data-app="audio-controller"]');

        return {audio, controller};
    },

    /**
     * Check if audio es paused.
     * 
     * @function isPaused
     * 
     * @param {Element} audio - audio HTML element
     * 
     * @returns {Boolean}
     */
    isPaused: audio => audio.paused,

    /**
     * Change aria-hidden atribute to show an icon.
     * 
     * @function showIcon
     * 
     * @param {Element} icon - svg icon
     * 
     * @returns {undefined}
     */
    showIcon: icon => icon.setAttribute('aria-hidden', 'false'),

    /**
     * Change aria-hidden atribute to hide an icon.
     * 
     * @function showIcon
     * 
     * @param {Element} icon - svg icon
     * 
     * @returns {undefined}
     */
    hideIcon: icon => icon.setAttribute('aria-hidden', 'true'),

    /**
     * Inside button show play icon and hide pause icon.
     * 
     * @function showPlayIcon
     * 
     * @param {Element} button - button HTML element
     * 
     * @returns {undefined}
     */
    showPlayIcon: button => (media.showIcon(button.children[0], media.hideIcon(button.children[1]))),

    /**
     * Inside button show pause icon and hide play icon.
     * 
     * @function showPauseIcon
     * 
     * @param {Element} button - button HTML element
     * 
     * @returns {undefined}
     */
    showPauseIcon: button => (media.hideIcon(button.children[0], media.showIcon(button.children[1]))),

    /**
     * Pause audio player.
     * 
     * @function pauseAudio
     * 
     * @param {Object} elements - object wich contains button and audio player
     * 
     * @returns {undefined}
     */
    pauseAudio: elements => elements.audio.pause(),

    /**
     * Play audio player.
     * 
     * @function playAudio
     * 
     * @param {Object} elements - object wich contains button and audio player
     * 
     * @returns {undefined}
     */
    playAudio: elements => elements.audio.play(),

    /**
     * Look for every audio wich are playing and pause them.
     * 
     * @function pausePlayedAudios
     * 
     * @returns {undefined}
     */
    pausePlayedAudios: () => [...document.querySelectorAll('[data-app="pause"][aria-hidden="false"]')].forEach(icon => media.pauseAudio(media.getElements(icon.closest('[data-app="column"]')))),

    /**
     * Audio behaviour handler.
     * 
     * @function handler
     * 
     * @param {Object} elements - object wich contains button and audio player
     * 
     * @returns {undefined}
     */
    handler: elements => media.isPaused(elements.audio) ? (media.pausePlayedAudios(), media.playAudio(elements)) : media.pauseAudio(elements),
    
    /**
     * When audio is finished we set his currentTime to 0 and show play icon.
     * 
     * @function resetAudio
     * 
     * @param {Object} elements - object wich contains button and audio player
     * 
     * @returns {undefined}
     */
    resetAudio: elements => (elements.audio.currentTime = 0, media.showPlayIcon(elements.controller)),

    /**
     * Bind events to controller and audio
     * 
     * @function bind
     * 
     * @param {Element} column - HTML element wich contains clip info
     * 
     * @returns {Element}
     */
    bind: column => {
        let elements = media.getElements(column);
        
        elements.controller.addEventListener('click', () => media.handler(elements));

        elements.audio.addEventListener('play', () => media.showPauseIcon(elements.controller));
        elements.audio.addEventListener('pause', () => media.showPlayIcon(elements.controller));
        elements.audio.addEventListener('ended', () => media.resetAudio(elements.controller));

        return column;
    }
}

export default media;