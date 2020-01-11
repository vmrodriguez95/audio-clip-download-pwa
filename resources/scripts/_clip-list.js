import media from './_media.js';

const textMessage = "No se han encontrado resultados";

/**
 * Remove content from ClipList HTML element
 * 
 * @function clearContent
 * 
 * @param {ClipList} self - ClipList
 * 
 * @returns {String}
 */
const clearContent = self => self.mod.innerHTML = "";

/**
 * Inject into ClipList HTML Element a Message with empty result
 * 
 * @function showEmptyMessage
 * 
 * @param {ClipList} self - ClipList
 * 
 * @returns {HTMLElement}
 */
const showEmptyMessage = self => self.mod.appendChild(buildColumn({}, textMessage));

/**
 * Print results into ClipList HTML Element
 * 
 * @function printResults
 * 
 * @param {Object} ev - Object with event info
 * 
 * @param {ClipList} self - ClipList
 * 
 * @returns {undefined}
 */
const printResults = (ev, self) => ev.results.forEach(result => self.mod.appendChild(buildColumn(result)));

/**
 * Look for download button into column given
 * 
 * @function findDownloadButton
 * 
 * @param {Element} column - Column HTML Element
 * 
 * @returns {Element}
 */
const findDownloadButton = column => column.querySelector('[data-app="download"]');

/**
 * Download audio clip
 * 
 * @function downloadAudio
 * 
 * @param {Element} button - Downloader button
 * 
 * @returns {Element}
 */
const downloadAudio = button => {
    fetch(button.dataset.appPreview)
    .then(resp => resp.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = 'clip-audio.m4a';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    })
    .catch(() => alert('oh no!'));
}

/**
 * Hanlder of the downloader button
 * 
 * @function handlerDownloader
 * 
 * @param {Element} button - Downloader button
 * 
 * @returns {undefined}
 */
const handlerDownloader = button => button.addEventListener('click', e => downloadAudio(button));

/**
 * Build column with necesary info or empty message
 * 
 * @function buildColumn
 * 
 * @param {Object} info - Track info
 * @param {String} message - Empty text message
 * 
 * @returns {Element}
 */
const buildColumn = (info, message = "") => {
    const column = document.createElement('article');
    
    if(message) {
        column.classList.add("vm-layout__column");
        column.innerHTML = `<p class="vm-paragraph">${message}</p>`;
    } else {
        column.classList.add("vm-layout__column", "vm-6/12", "vm-4/12--tablet", "vm-3/12--desktop");
        column.setAttribute('data-app', 'column');
        column.innerHTML = `
            <div class="vm-clip">
                <div class="vm-clip__header">
                    <img class="vm-clip__img" src="${info.artworkUrl100}" alt="${info.artistName}" />
                    <button class="vm-clip__controller" type="button" data-app="audio-controller">
                        <svg data-app="play" aria-hidden="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><path d="M45.6 29.2l-22-15c-0.3-0.2-0.7-0.2-1-0.1C22.2 14.3 22 14.6 22 15v30c0 0.4 0.2 0.7 0.5 0.9C22.7 46 22.8 46 23 46c0.2 0 0.4-0.1 0.6-0.2l22-15C45.8 30.6 46 30.3 46 30S45.8 29.4 45.6 29.2zM24 43.1V16.9L43.2 30 24 43.1z"/><path d="M30 0C13.5 0 0 13.5 0 30s13.5 30 30 30 30-13.5 30-30S46.5 0 30 0zM30 58C14.6 58 2 45.4 2 30S14.6 2 30 2s28 12.6 28 28S45.4 58 30 58z"/></svg>
                        <svg data-app="pause" aria-hidden="true" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg"><path d="m240 0c-132.5 0-240 107.5-240 240s107.5 240 240 240 240-107.5 240-240c-0.1-132.5-107.5-239.9-240-240zm0 464c-123.7 0-224-100.3-224-224s100.3-224 224-224 224 100.3 224 224c-0.1 123.7-100.3 223.9-224 224zm0 0"/><path d="m216 136h-48c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-192c0-4.4-3.6-8-8-8zm-8 192h-32v-176h32zm0 0"/><path d="m312 136h-48c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-192c0-4.4-3.6-8-8-8zm-8 192h-32v-176h32zm0 0"/></svg>
                    </button>
                    <audio aria-hidden="true">
                        <source src="${info.previewUrl}" type="audio/mp4">
                    </audio>
                </div>
                <p class="vm-clip__name">${info.artistName}</p>
                <p class="vm-clip__separator">-</p>
                <p class="vm-clip__track">${info.trackName}</p>
                <button data-app="download" data-app-preview="${info.previewUrl}" class="vm-clip__downloader" title="Pulsa para descargar el clip de la canción"><svg viewBox="0 -16 512.00046 512" xmlns="http://www.w3.org/2000/svg"><path d="m413.492188 128.910156c-17.292969-86.765625-101.648438-143.082031-188.414063-125.789062-63.460937 12.648437-113.082031 62.238281-125.769531 125.691406-61.519532 7.089844-105.648438 62.707031-98.5625 124.230469 6.523437 56.621093 54.480468 99.339843 111.476562 99.300781h80.09375c8.847656 0 16.019532-7.171875 16.019532-16.019531 0-8.847657-7.171876-16.019531-16.019532-16.019531h-80.09375c-44.238281-.261719-79.882812-36.332032-79.625-80.566407.261719-44.238281 36.332032-79.886719 80.570313-79.625 8.164062 0 15.023437-6.140625 15.921875-14.257812 8.132812-70.304688 71.722656-120.707031 142.03125-112.574219 59.109375 6.835938 105.738281 53.464844 112.574218 112.574219 1.34375 8.261719 8.5 14.3125 16.867188 14.257812 44.238281 0 80.097656 35.859375 80.097656 80.097657 0 44.234374-35.859375 80.09375-80.097656 80.09375h-80.09375c-8.847656 0-16.019531 7.171874-16.019531 16.019531 0 8.847656 7.171875 16.019531 16.019531 16.019531h80.097656c61.925782-.386719 111.816406-50.902344 111.433594-112.828125-.351562-56.394531-42.53125-103.753906-98.507812-110.605469zm0 0"/><path d="m313.019531 385.183594-40.609375 40.621094v-201.613282c0-8.847656-7.171875-16.019531-16.015625-16.019531-8.847656 0-16.019531 7.171875-16.019531 16.019531v201.613282l-40.609375-40.621094c-6.144531-6.367188-16.289063-6.542969-22.652344-.394532-6.363281 6.144532-6.539062 16.285157-.394531 22.648438.132812.136719.261719.265625.394531.394531l67.9375 67.953125c1.484375 1.480469 3.242188 2.65625 5.175781 3.460938 3.941407 1.667968 8.390626 1.667968 12.335938 0 1.933594-.804688 3.691406-1.980469 5.171875-3.460938l67.9375-67.953125c6.363281-6.144531 6.539063-16.285156.394531-22.648437-6.148437-6.363282-16.289062-6.539063-22.652344-.394532-.132812.128907-.265624.257813-.394531.394532zm0 0"/></svg></a>
            </div>
        `;

        handlerDownloader(findDownloadButton(column));
        media.bind(column);
    }

    return column;
}

/**
 * Check if exits some result
 * 
 * @function hasResults
 * 
 * @param {Object} ev - Event info
 * 
 * @returns {Boolean}
 */
const hasResults = ev => ev.resultCount > 0;

/**
 * 
 * @class ClipList
 */
export default class ClipList {
    constructor(mod) {
        this.mod = mod;
    }

    /**
     * Handler ClipList behaviour and show getting content or empty message
     * 
     * @method clipListHandler
     * 
     * @param {Object} ev - Event info
     * @param {ClipList} self - ClipList class
     * 
     * @returns {undefined}
     */
    clipListHandler(ev, self) {
        clearContent(self);
        hasResults(ev) ? printResults(ev, self) : showEmptyMessage(self);
    }

     /**
     * Bind events
     * 
     * @method bind
     * 
     * @returns {undefined}
     */
    bind() {
        const self = this;
        self.mod.addEventListener('vm:print', ev => self.clipListHandler(ev, self));
    }

    /**
     * Start magic
     * 
     * @method init
     * 
     * @returns {undefined}
     */
    init() {
        this.bind();
    }
}