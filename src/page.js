/**
 * @abstract
 */
export default class Page {
    /**
     * Default page title
     */
    static #root = ""
    
    /**
     * Updated page title
     */
    static #title = ""
    

    static #document


    constructor() {
        throw new Error(`${new.target.name} class must not be called with \"new\" keyword!`)
    }

    /**
     * @param {Document} document 
     */
    static setDocument(document) {
        if (!(typeof document instanceof Document)) throw new Error("Invalid 'document' provided. It must be a Document object!")

        this.#document = document
    }
    
    /**
     * @returns {Document} 
     */
    static _getDocument() {
        return this.#document
    }

    /**
     * @param {string} value
     * @returns {void}
     */
    static setTitle(value) {
        if (typeof value !== "string") throw new Error("Invalid 'title' provided. It must be a string!")

        this.#title = value

        this.#updateTitle()
    }

    /**
     * @param {string} value 
     * @returns {void}
     */
    static setRootTitle(value) {
        if (typeof value !== "string") throw new Error("Invalid 'value' provided. It must be a string!")

        this.#root = value

        this.#updateTitle()
    }

    /**
     * @param {string} value 
     * @returns {void}
     */
    static getTitle() {
        return this.#title || this.#root
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
    static #updateTitle() {
        const document = this._getDocument()

        !this.getTitle() ? (document.title = this.getRootTitle()) : (document.title = this.getTitle()) 
    }
}