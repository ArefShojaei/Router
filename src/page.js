/**
 * @abstract
 */
export default class Page {
    /**
     * Default page title
     */
    static #root = ""
    
    /**
     * Origin page title
     */
    static #origin = ""


    constructor() {
        throw new Error(`${new.target.name} class must not be called with \"new\" keyword!`)
    }

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