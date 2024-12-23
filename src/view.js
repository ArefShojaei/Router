export default class View {
    /**
     * @param {string} view 
     * @param {object} data 
     * @returns {string}
     */
    static render(view, data = {}) {
        return view(data)
    }
}