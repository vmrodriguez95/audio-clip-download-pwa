
export default class myTextfield {
    constructor(mod) {
        this.mod = mod;
    }

    getValue() {
        return this.mod.value;
    }

    isValueEmpty(value) {
        return value === "";
    }

    addNotEmptyClass() {
        this.mod.classList.add('notEmpty');
    }

    removeNotEmptyClass() {
        this.mod.classList.remove('notEmpty');
    }

    textfieldHandler(self) {
        self.isValueEmpty(self.getValue) ? self.removeNotEmptyClass() : self.addNotEmptyClass();
    }

    bind() {
        const self = this;

        self.mod.addEventListener('keypress', () => this.textfieldHandler(self));
        self.mod.addEventListener('keyup', () => this.textfieldHandler(self));
    }

    init() {
        this.bind();
    }
}

