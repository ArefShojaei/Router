/**
 * @abstract
 */
export default class Selector {
    static #elements = []


    constructor() {
        throw new Error(`${new.target.name} class must not be called with \"new\" keyword!`)
    }

    /**
     * @param {HTMLAnchorElement} element 
     * @param {Document} document 
     * @returns {Selector}
     */
    static findAll(element, document = document) {
        if (!(typeof element instanceof HTMLElement)) throw new Error("Invalid 'element' provided. It must be an HTMLElement!")

        if (!(typeof document instanceof Document)) throw new Error("Invalid 'document' provided. It must be a Document object!")


        const elements = document.querySelectorAll(element)
        
        this._setElements(elements)

        return this
    }

    /**
     * @param {function} callback
     * @returns {void}
     */
    static each(callback) {
        if (typeof callback !== "function") throw new Error("Invalid 'callback' provided. It must be a function!")


        const elements = this._getElements()

        elements.forEach(callback)
    }

    /**
     * @param {array} elements 
     */
    static _setElements(elements) {
        this.#elements.push(...elements)
    }

    /**
     * @returns {array}
     */
    static _getElements() {
        return this.#elements
    }
}