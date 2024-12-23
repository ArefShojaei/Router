export default class View {
    static render(view, data = {}) {
        return view(data)
    }
}