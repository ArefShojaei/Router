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
     */
    static onClick(element, callback) {
        if (!(element instanceof HTMLElement)) throw new InvalidArgumentTypeError("'element' must be an HTMLElement!")

        if (typeof callback !== "function") throw new InvalidArgumentTypeError("'callback' must be a function!")

        
        element.addEventListener("click", callback)
    }
}