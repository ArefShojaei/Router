export default class Route {
    title = ""
    
    template
    
    middlewares = []
    
    meta = {
        params : {},
        query : {},
    }


    constructor({ title, template }) {
        this.title = title ?? this.title
        this.template = template
    }
}