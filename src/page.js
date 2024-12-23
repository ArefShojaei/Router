export default class Page {
    static root
    static origin

    static setTitle(value) {
        this.origin = value

        this.applyTitle()
    }

    static setRootTitle(value) {
        this.root = value

        this.applyTitle()
    }

    static getTitle() {
        return this.origin
    }

    static getRootTitle() {
        return this.root
    }


    static applyTitle() {
        !this.getTitle() ? (document.title = this.getRootTitle()) : (document.title = this.getTitle()) 
    }
}