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
        if (!(typeof element instanceof HTMLElement)) throw new Error("Invalid 'element' provided. It must be an HTMLElement!")

        if (typeof callback !== "function") throw new Error("Invalid 'callback' provided. It must be a function!")

        
        element.addEventListener("click", callback)
    }
}