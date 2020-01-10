export default class MyForm {
    constructor(...args) {
        this.mod = args[0];
        this.apiUrl = 'https://itunes.apple.com/search';
        this.textfield = args[1];
        this.clipList = args[2];

        this.onPrint = new Event('vm:print');
    }

    /**
     * Fire onPrint event to print results
     * 
     * @method fireEvent
     * 
     * @param {Object} data - Object with results from api request
     * @param {MyForm} self - MyForm
     * 
     * @returns {undefined}
     */
    fireEvent(data, self) {
        self.onPrint.container = self.clipList;
        self.onPrint.resultCount = data.resultCount;
        self.onPrint.results = data.results;

        self.clipList.dispatchEvent(self.onPrint);
    }

    /**
     * Get user search cleaned and ready to send to ITunes API
     * 
     * @method getQuery
     * 
     * @param {Object} data - Object with results from api request
     * @param {MyForm} self - MyForm
     * 
     * @returns {String}
     */
    getQuery() {
        return sanitize(this.textfield.getValue());
    }

    /**
     * Send request to ITunes API
     * 
     * @method launchApiRequest
     * 
     * @returns {undefined}
     */
    launchApiRequest() {
        const self = this;
        fetch(`${self.apiUrl}?term=${self.getQuery()}`).then(extractTextFromData).then(transformData).then(data => self.fireEvent(data, self));
    }

    /**
     * Send request to ITunes API
     * 
     * @method launchApiRequest
     * 
     * @param {Object} e - Object given from addEventListener
     * @param {MyForm} self - MyForm
     * 
     * @returns {undefined}
     */
    formHandler(e, self) {
        e.preventDefault();
        self.textfield.isValueEmpty(self.textfield.getValue()) ? null : self.launchApiRequest();
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
        self.mod.addEventListener('submit', e => this.formHandler(e, self));
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

/**
 * Sanitize a string
 * 
 * @function sanitize
 * 
 * @param {String} value - string to clean
 * 
 * @returns {String}
 */
const sanitize = value => {
    let newValue = value;

    newValue = newValue.toLowerCase();
    newValue.replace(/á/g, 'a');
    newValue.replace(/é/g, 'e');
    newValue.replace(/í/g, 'i');
    newValue.replace(/ó/g, 'o');
    newValue.replace(/ú/g, 'u');
    newValue.replace(/ü/g, 'u');
    newValue.replace(/\s/g, '+');

    return newValue;
}

/**
 * Extract JSON from data
 * 
 * @function extractTextFromData
 * 
 * @param {Object} data - Object data
 * 
 * @returns {Promise}
 */
const extractTextFromData = data => data.text();

/**
 * Convert JSON to Object
 * 
 * @function transformData
 * 
 * @param {JSON} data - JSON data
 * 
 * @returns {Object}
 */
const transformData = data => JSON.parse(data);