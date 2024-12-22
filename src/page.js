export default class Page {
    static setTitle(value) {
        value && (document.title = value)
    }
}