/**
 * @abstract
 */
export default class View {
    constructor() {
        throw new Error(`${new.target.name} class must not be called with \"new\" keyword!`)
    }

    /**
     * @param {string} template 
     * @param {object} data 
     * @returns {string}
     */
    static render(template, data = {}) {
        if (typeof template !== "string") throw new Error("Invalid 'template' provided. It must be a string!")

        try {
            return template(data)
        } catch (error) {
            console.error("Error during template rendering: ", error);            
        }
    }
}