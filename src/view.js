import { InvalidArgumentTypeError } from "./exception.js"

/**
 * @abstract
 */
export default class View {
    constructor() {
        throw new Error(`${new.target.name} class must not be called with \"new\" keyword!`)
    }

    /**
     * @param {function} template 
     * @param {object} data 
     * @returns {string}
     */
    static render(template, data = {}) {
        if (typeof template !== "function") throw new InvalidArgumentTypeError("'template' must be a function!")

        try {
            return template(data)
        } catch (error) {
            console.error("Error during template rendering: ", error);            
        }
    }
}