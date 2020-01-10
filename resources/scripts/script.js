import MyForm from './_form';
import MyTextfield from './_textfield';
import ClipList from './_clip-list';

(() => {
    const ctx = document;
    const form = ctx.querySelector('[data-app="form"]');
    const textfield = ctx.querySelector('[data-app="textfield"]');
    const clipList = ctx.querySelector('[data-app="clip-list"]');

    let txtInstance = new MyTextfield(textfield);
    let clipInstance = new ClipList(clipList);
    let formInstance = new MyForm(form, txtInstance, clipList);

    txtInstance.init();
    clipInstance.init();
    formInstance.init();
})();