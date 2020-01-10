export default class myForm {
    constructor(...args) {
        this.mod = args[0];
        this.apiUrl = 'https://itunes.apple.com/search';
        this.textfield = args[1];
        this.clipList = args[2];

        this.onPrint = new Event('vm:print');
    }

    fireEvent(data, self) {
        self.onPrint.container = self.clipList;
        self.onPrint.resultCount = data.resultCount;
        self.onPrint.results = data.results;

        self.clipList.dispatchEvent(self.onPrint);
    }

    getQuery() {
        return sanitize(this.textfield.getValue());
    }

    launchApiRequest() {
        const self = this;
        fetch(`${self.apiUrl}?term=${self.getQuery()}`).then(extractTextFromData).then(transformData).then(data => self.fireEvent(data, self));
    }

    formHandler(e, self) {
        e.preventDefault();
        self.textfield.isValueEmpty(self.textfield.getValue()) ? null : self.launchApiRequest();
    }

    bind() {
        const self = this;
        self.mod.addEventListener('submit', e => this.formHandler(e, self));
    }

    init() {
        this.bind();
    }
}

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

const extractTextFromData = data => data.text();

const transformData = data => JSON.parse(data);