import myForm from './_form';
import myTextfield from './_textfield';
import ClipList from './_clip-list';

(() => {
    const ctx = document;
    const form = ctx.querySelector('[data-app="form"]');
    const textfield = ctx.querySelector('[data-app="textfield"]');
    const clipList = ctx.querySelector('[data-app="clip-list"]');

    let txtInstance = new myTextfield(textfield);
    let clipInstance = new ClipList(clipList);
    let formInstance = new myForm(form, txtInstance, clipList);

    txtInstance.init();
    clipInstance.init();
    formInstance.init();
})();