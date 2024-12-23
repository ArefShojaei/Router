export default class Page {
    /**
     * Default page title
     */
    static #root = ""
    
    /**
     * Origin page title
     */
    static #origin = ""


    /**
     * @param {string} value
     * @returns {void}
     */
    static setTitle(value) {
        this.#origin = value

        this.#applyTitle()
    }

    /**
     * @param {string} value 
     * @returns {void}
     */
    static setRootTitle(value) {
        this.#root = value

        this.#applyTitle()
    }

    /**
     * @param {string} value 
     * @returns {void}
     */
    static getTitle() {
        return this.#origin
    }

    /**
     * @returns {string}
     */
    static getRootTitle() {
        return this.#root
    }

    /**
     * @returns {void}
     */
    static #applyTitle() {
        !this.getTitle() ? (document.title = this.getRootTitle()) : (document.title = this.getTitle()) 
    }
}