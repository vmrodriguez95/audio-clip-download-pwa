'use strict';function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}var MyForm=function(){function a(){_classCallCheck(this,a),this.mod=0>=arguments.length?void 0:arguments[0],this.apiUrl="https://itunes.apple.com/search",this.textfield=1>=arguments.length?void 0:arguments[1],this.clipList=2>=arguments.length?void 0:arguments[2],this.onPrint=new Event("vm:print")}return _createClass(a,[{key:"fireEvent",value:function fireEvent(a,b){b.onPrint.container=b.clipList,b.onPrint.resultCount=a.resultCount,b.onPrint.results=a.results,b.clipList.dispatchEvent(b.onPrint)}},{key:"getQuery",value:function getQuery(){return sanitize(this.textfield.getValue())}},{key:"launchApiRequest",value:function launchApiRequest(){var a=this;fetch("".concat(a.apiUrl,"?term=").concat(a.getQuery())).then(extractTextFromData).then(transformData).then(function(b){return a.fireEvent(b,a)})}},{key:"formHandler",value:function formHandler(a,b){a.preventDefault(),b.textfield.isValueEmpty(b.textfield.getValue())?null:b.launchApiRequest()}},{key:"bind",value:function bind(){var a=this,b=this;b.mod.addEventListener("submit",function(c){return a.formHandler(c,b)})}},{key:"init",value:function init(){this.bind()}}]),a}(),sanitize=function(a){var b=a;return b=b.toLowerCase(),b.replace(/á/g,"a"),b.replace(/é/g,"e"),b.replace(/í/g,"i"),b.replace(/ó/g,"o"),b.replace(/ú/g,"u"),b.replace(/ü/g,"u"),b.replace(/\s/g,"+"),b},extractTextFromData=function(a){return a.text()},transformData=function(a){return JSON.parse(a)},MyTextfield=function(){function a(b){_classCallCheck(this,a),this.mod=b}return _createClass(a,[{key:"getValue",value:function getValue(){return this.mod.value}},{key:"isValueEmpty",value:function isValueEmpty(a){return""===a}},{key:"addNotEmptyClass",value:function addNotEmptyClass(){this.mod.classList.add("notEmpty")}},{key:"removeNotEmptyClass",value:function removeNotEmptyClass(){this.mod.classList.remove("notEmpty")}},{key:"textfieldHandler",value:function textfieldHandler(a){a.isValueEmpty(a.getValue())?a.removeNotEmptyClass():a.addNotEmptyClass()}},{key:"bind",value:function bind(){var a=this,b=this;b.mod.addEventListener("keypress",function(){return a.textfieldHandler(b)}),b.mod.addEventListener("keyup",function(){return a.textfieldHandler(b)})}},{key:"init",value:function init(){this.bind()}}]),a}(),media={getElements:function getElements(a){var b=a.querySelector("audio"),c=a.querySelector("[data-app=\"audio-controller\"]");return{audio:b,controller:c}},isPaused:function isPaused(a){return a.paused},showIcon:function showIcon(a){return a.setAttribute("aria-hidden","false")},hideIcon:function hideIcon(a){return a.setAttribute("aria-hidden","true")},showPlayIcon:function showPlayIcon(a){return media.showIcon(a.children[0],media.hideIcon(a.children[1]))},showPauseIcon:function showPauseIcon(a){return media.hideIcon(a.children[0],media.showIcon(a.children[1]))},pauseAudio:function pauseAudio(a){return a.audio.pause()},playAudio:function playAudio(a){return a.audio.play()},pausePlayedAudios:function pausePlayedAudios(){return _toConsumableArray(document.querySelectorAll("[data-app=\"pause\"][aria-hidden=\"false\"]")).forEach(function(a){return media.pauseAudio(media.getElements(a.closest("[data-app=\"column\"]")))})},handler:function handler(a){return media.isPaused(a.audio)?(media.pausePlayedAudios(),media.playAudio(a)):media.pauseAudio(a)},resetAudio:function resetAudio(a){return a.audio.currentTime=0,media.showPlayIcon(a.controller)},bind:function bind(a){var b=media.getElements(a);b.controller.addEventListener("click",function(){return media.handler(b)}),b.audio.addEventListener("play",function(){return media.showPauseIcon(b.controller)}),b.audio.addEventListener("pause",function(){return media.showPlayIcon(b.controller)}),b.audio.addEventListener("ended",function(){return media.resetAudio(b.controller)})}},textMessage="No se han encontrado resultados",clearContent=function(a){return a.mod.innerHTML=""},showEmptyMessage=function(a){return a.mod.appendChild(buildColumn({},textMessage))},printResults=function(a,b){return a.results.forEach(function(a){return b.mod.appendChild(buildColumn(a))})},findDownloadButton=function(a){return a.querySelector("[data-app=\"download\"]")},downloadAudio=function(a){fetch(a.dataset.appPreview).then(function(a){return a.blob()}).then(function(b){var c=window.URL.createObjectURL(b),d=document.createElement("a");d.style.display="none",d.href=c,d.download="clip-audio.m4a",document.body.appendChild(d),d.click(),window.URL.revokeObjectURL(c),document.body.removeChild(d)})["catch"](function(){return alert("oh no!")})},handlerDownloader=function(a){return a.addEventListener("click",function(){return downloadAudio(a)})},buildColumn=function(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"",c=document.createElement("article");return b?(c.classList.add("vm-layout__column"),c.innerHTML="<p class=\"vm-paragraph\">".concat(b,"</p>")):(c.classList.add("vm-layout__column","vm-6/12","vm-4/12--tablet","vm-3/12--desktop"),c.setAttribute("data-app","column"),c.innerHTML="\n            <div class=\"vm-clip\">\n                <div class=\"vm-clip__header\">\n                    <img class=\"vm-clip__img\" src=\"".concat(a.artworkUrl100,"\" alt=\"").concat(a.artistName,"\" />\n                    <button class=\"vm-clip__controller\" type=\"button\" data-app=\"audio-controller\">\n                        <svg data-app=\"play\" aria-hidden=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 60 60\"><path d=\"M45.6 29.2l-22-15c-0.3-0.2-0.7-0.2-1-0.1C22.2 14.3 22 14.6 22 15v30c0 0.4 0.2 0.7 0.5 0.9C22.7 46 22.8 46 23 46c0.2 0 0.4-0.1 0.6-0.2l22-15C45.8 30.6 46 30.3 46 30S45.8 29.4 45.6 29.2zM24 43.1V16.9L43.2 30 24 43.1z\"/><path d=\"M30 0C13.5 0 0 13.5 0 30s13.5 30 30 30 30-13.5 30-30S46.5 0 30 0zM30 58C14.6 58 2 45.4 2 30S14.6 2 30 2s28 12.6 28 28S45.4 58 30 58z\"/></svg>\n                        <svg data-app=\"pause\" aria-hidden=\"true\" viewBox=\"0 0 480 480\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m240 0c-132.5 0-240 107.5-240 240s107.5 240 240 240 240-107.5 240-240c-0.1-132.5-107.5-239.9-240-240zm0 464c-123.7 0-224-100.3-224-224s100.3-224 224-224 224 100.3 224 224c-0.1 123.7-100.3 223.9-224 224zm0 0\"/><path d=\"m216 136h-48c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-192c0-4.4-3.6-8-8-8zm-8 192h-32v-176h32zm0 0\"/><path d=\"m312 136h-48c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-192c0-4.4-3.6-8-8-8zm-8 192h-32v-176h32zm0 0\"/></svg>\n                    </button>\n                    <audio aria-hidden=\"true\">\n                        <source src=\"").concat(a.previewUrl,"\" type=\"audio/mp4\">\n                    </audio>\n                </div>\n                <p class=\"vm-clip__name\">").concat(a.artistName,"</p>\n                <p class=\"vm-clip__separator\">-</p>\n                <p class=\"vm-clip__track\">").concat(a.trackName,"</p>\n                <button data-app=\"download\" data-app-preview=\"").concat(a.previewUrl,"\" class=\"vm-clip__downloader\" title=\"Pulsa para descargar el clip de la canci\xF3n\"><svg viewBox=\"0 -16 512.00046 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m413.492188 128.910156c-17.292969-86.765625-101.648438-143.082031-188.414063-125.789062-63.460937 12.648437-113.082031 62.238281-125.769531 125.691406-61.519532 7.089844-105.648438 62.707031-98.5625 124.230469 6.523437 56.621093 54.480468 99.339843 111.476562 99.300781h80.09375c8.847656 0 16.019532-7.171875 16.019532-16.019531 0-8.847657-7.171876-16.019531-16.019532-16.019531h-80.09375c-44.238281-.261719-79.882812-36.332032-79.625-80.566407.261719-44.238281 36.332032-79.886719 80.570313-79.625 8.164062 0 15.023437-6.140625 15.921875-14.257812 8.132812-70.304688 71.722656-120.707031 142.03125-112.574219 59.109375 6.835938 105.738281 53.464844 112.574218 112.574219 1.34375 8.261719 8.5 14.3125 16.867188 14.257812 44.238281 0 80.097656 35.859375 80.097656 80.097657 0 44.234374-35.859375 80.09375-80.097656 80.09375h-80.09375c-8.847656 0-16.019531 7.171874-16.019531 16.019531 0 8.847656 7.171875 16.019531 16.019531 16.019531h80.097656c61.925782-.386719 111.816406-50.902344 111.433594-112.828125-.351562-56.394531-42.53125-103.753906-98.507812-110.605469zm0 0\"/><path d=\"m313.019531 385.183594-40.609375 40.621094v-201.613282c0-8.847656-7.171875-16.019531-16.015625-16.019531-8.847656 0-16.019531 7.171875-16.019531 16.019531v201.613282l-40.609375-40.621094c-6.144531-6.367188-16.289063-6.542969-22.652344-.394532-6.363281 6.144532-6.539062 16.285157-.394531 22.648438.132812.136719.261719.265625.394531.394531l67.9375 67.953125c1.484375 1.480469 3.242188 2.65625 5.175781 3.460938 3.941407 1.667968 8.390626 1.667968 12.335938 0 1.933594-.804688 3.691406-1.980469 5.171875-3.460938l67.9375-67.953125c6.363281-6.144531 6.539063-16.285156.394531-22.648437-6.148437-6.363282-16.289062-6.539063-22.652344-.394532-.132812.128907-.265624.257813-.394531.394532zm0 0\"/></svg></a>\n            </div>\n        "),handlerDownloader(findDownloadButton(c)),media.bind(c)),c},hasResults=function(a){return 0<a.resultCount},ClipList=function(){function a(b){_classCallCheck(this,a),this.mod=b}return _createClass(a,[{key:"clipListHandler",value:function clipListHandler(a,b){clearContent(b),hasResults(a)?printResults(a,b):showEmptyMessage(b)}},{key:"bind",value:function bind(){var a=this;a.mod.addEventListener("vm:print",function(b){return a.clipListHandler(b,a)})}},{key:"init",value:function init(){this.bind()}}]),a}();(function(){var a=document,b=a.querySelector("[data-app=\"form\"]"),c=a.querySelector("[data-app=\"textfield\"]"),d=a.querySelector("[data-app=\"clip-list\"]"),e=new MyTextfield(c),f=new ClipList(d),g=new MyForm(b,e,d);e.init(),f.init(),g.init()})();
