import { InvalidArgumentTypeError } from "../exception.js"

/**
 * @abstract
 */
export default class Element {
    constructor() {
        throw new Error(`${new.target.name} class must not be called with \"new\" keyword!`)
    }

    /**
     * @param {HTMLElement} element 
     * @param {function} callback 
     * @returns {void}
     */
    static onClick(element, callback) {
        if (typeof element !== "object") throw new InvalidArgumentTypeError("'element' must be an HTMLElement object!")

        if (typeof callback !== "function") throw new InvalidArgumentTypeError("'callback' must be a function!")

        
        element.addEventListener("click", callback)
    }
}