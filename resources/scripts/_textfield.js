export default class MyTextfield {
    constructor(mod) {
        this.mod = mod;
    }

    /**
     * Get value from input text
     * 
     * @method getValue
     * 
     * @returns {String}
     */
    getValue() {
        return this.mod.value;
    }

    /**
     * Check if value given is empty
     * 
     * @method isValueEmpty
     * 
     * @param {String} value
     * 
     * @returns {Boolean}
     */
    isValueEmpty(value) {
        return value === "";
    }

    /**
     * Add class "notEmpty"
     * 
     * @method addNotEmptyClass
     * 
     * @returns {undefined}
     */
    addNotEmptyClass() {
        this.mod.classList.add('notEmpty');
    }

    /**
     * Remove class "notEmpty"
     * 
     * @method removeNotEmptyClass
     * 
     * @returns {undefined}
     */
    removeNotEmptyClass() {
        this.mod.classList.remove('notEmpty');
    }

    /**
     * Textfield handler
     * 
     * @method textfieldHandler
     * 
     * @param self - MyTextfield
     * 
     * @returns {undefined}
     */
    textfieldHandler(self) {
        self.isValueEmpty(self.getValue()) ? self.removeNotEmptyClass() : self.addNotEmptyClass();
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

        self.mod.addEventListener('keypress', () => this.textfieldHandler(self));
        self.mod.addEventListener('keyup', () => this.textfieldHandler(self));
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

