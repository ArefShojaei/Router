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
     * @returns {Selector}
     */
    static findAll(element) {
        this.#elements.push(...document.querySelectorAll(element))
        
        return this
    }

    /**
     * @param {function} callback
     * @returns {void}
     */
    static each(callback) {
        this.#elements.forEach(callback)
    }
}