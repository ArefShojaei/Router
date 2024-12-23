/**
 * @abstract
 */
export default class Element {
    constructor() {
        throw new Error(`${new.target.name} class must not be called with \"new\" keyword!`)
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @param {function} callback 
     */
    static onClick(element, callback) {
        element.addEventListener("click", callback)
    }
}