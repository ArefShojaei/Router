import { InvalidArgumentTypeError } from "../exception.js"

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
    static findAll(element, document) {
        if (typeof element !== "string") throw new InvalidArgumentTypeError("'element' must be an HTMLElement object!")

        if (!(document instanceof Document)) throw new InvalidArgumentTypeError("'document' must be a Document object!")


        const elements = document.querySelectorAll(element)
        
        this._setElements(elements)

        return this
    }

    /**
     * @param {function} callback
     * @returns {void}
     */
    static each(callback) {
        if (!this.#elements.length) throw new Error("Can not use it before selecting elements!")

        if (typeof callback !== "function") throw new InvalidArgumentTypeError("'callback' must be a function!")


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