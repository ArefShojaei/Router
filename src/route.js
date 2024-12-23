import Router from "./router.js"


export default class Route extends Router {    
    static addRoute(route, callback) {
        this.routes[this.routePrefix + route] = {
            view: callback,
            middlewares: [],
        };

        this.currentRoute = route;

        return this;
    }

    static group(prefix, callback) {
        this.routePrefix = prefix;

        callback();

        this.routePrefix = ""

        return this;
    }

    static title(value) {
        this.routes[this.currentRoute]["title"] = value
    }

    static redirect(to) {
        this.setRouteToURL(to)

        const { view } = this.routes[to];

        const renderedTemplate = view()

        return renderedTemplate
    }
}