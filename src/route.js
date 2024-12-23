import Router from "./router.js"
import View from "./view.js";


export default class Route extends Router {    
    static addRoute(route, callback) {
        this._routes[this._routePrefix + route] = {
            view: callback,
            middlewares: [],
            title : ""
        };

        this._currentRoute = route;

        return this;
    }

    static group(prefix, callback) {
        this._routePrefix = prefix;

        callback();

        this._routePrefix = ""

        return this;
    }

    static middleware(middlewares) {
        const isDefinedRoutePrefix = this._routePrefix ? true : false

        // Add middlewares to single route
        if (!isDefinedRoutePrefix) {
            this._routes[this._routePrefix + this._currentRoute][
                "middlewares"
            ].push(...middlewares);

            return;
        }

        // Add middlewares to the group of routes
        for (const route in this._routes) {
            if (!route.startsWith(this._routePrefix)) continue;

            this._routes[route]["middlewares"].push(...middlewares);
        }
    }

    static title(value) {
        this._routes[this._routePrefix + this._currentRoute]["title"] = value
    }

    static redirect(to) {
        this._setRouteToURL(to)

        const { view } = this._routes[to];

        return View.render(view)
    }
}