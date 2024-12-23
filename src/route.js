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

    static middleware(middlewares) {
        const isDefinedRoutePrefix = this.routePrefix ? true : false

        // Add middlewares to single route
        if (!isDefinedRoutePrefix) {
            this.routes[this.routePrefix + this.currentRoute][
                "middlewares"
            ].push(...middlewares);

            return;
        }

        // Add middlewares to the group of routes
        for (const route in this.routes) {
            if (!route.startsWith(this.routePrefix)) continue;

            this.routes[route]["middlewares"].push(...middlewares);
        }
    }

    static title(value) {
        this.routes[this.routePrefix + this.currentRoute]["title"] = value
    }

    static redirect(to) {
        this.setRouteToURL(to)

        const { view } = this.routes[to];

        const renderedTemplate = view()

        return renderedTemplate
    }
}