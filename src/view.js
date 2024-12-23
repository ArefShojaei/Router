/**
 * @abstract
 */
export default class View {
    constructor() {
        throw new Error(`${new.target.name} class must not be called with \"new\" keyword!`)
    }

    /**
     * @param {string} view 
     * @param {object} data 
     * @returns {string}
     */
    static render(view, data = {}) {
        return view(data)
    }
}