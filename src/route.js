import Router from "./router.js"
import View from "./view.js";
import { InvalidArgumentTypeError } from "./exception.js"
import RouteDTO from "./dto/route.js"


/**
 * @abstract
 */
export default class Route extends Router {
    constructor() {
        throw new Error(`${new.target.name} class must not be called with \"new\" keyword!`)
    }

    /**
     * @param {string} route 
     * @param {fucntion} callback 
     * @returns {Route}
     */   
    static add(route, callback) {
        if (typeof route !== "string") throw new InvalidArgumentTypeError("'route' must be a string!")
        
        if (typeof callback !== "function") throw new InvalidArgumentTypeError("'callback' must be a function!")


        this._routes[this._routePrefix + route] = new RouteDTO({ template : callback })

        this._currentRoute = route;

        return this;
    }

    /**
     * @param {string} prefix 
     * @param {function} callback 
     * @returns {Route}
     */
    static group(prefix, callback) {
        if (typeof prefix !== "string" || !prefix.startsWith("/")) throw new InvalidArgumentTypeError("'prefix' must be a string!")
        
        if (typeof callback !== "function") throw new InvalidArgumentTypeError("'callback' must be a function!")


        const previousPrefix = this._routePrefix 

        this._routePrefix = prefix;

        callback();

        this._routePrefix = previousPrefix

        return this;
    }

    /**
     * @param {array} middlewares
     * @returns {void}
     */
    static middleware(middlewares) {
        if (!Array.isArray(middlewares)) throw new InvalidArgumentTypeError("'middlewares' must be an array!")

        const isDefinedRoutePrefix = this._routePrefix ? true : false

        // Add middlewares to single route
        if (!isDefinedRoutePrefix) {
            this._routes[this._routePrefix + this._currentRoute]["middlewares"].push(...middlewares);

            return;
        }

        // Add middlewares to the group of routes
        for (const route in this._routes) {
            if (!route.startsWith(this._routePrefix)) continue;

            this._routes[route]["middlewares"].push(...middlewares);
        }
    }

    /**
     * Set route page title
     * @param {string} value
     * @returns {void}
     */
    static title(value) {
        if (typeof value !== "string") throw new InvalidArgumentTypeError("'value' must be a string!")

        this._routes[this._routePrefix + this._currentRoute]["title"] = value
    }

    /**
     * @param {string} to - Route pointer  
     * @returns {string}
     */
    static redirect(to) {
        if (typeof to !== "string" || !to.startsWith("/")) throw new InvalidArgumentTypeError("'to' must be a string starting route with \"/\"!")


        this._setRouteToURL(to)

        const { template, meta } = this._routes[to] ?? this._defaultRoute;

        return View.render(template, meta)
    }
}