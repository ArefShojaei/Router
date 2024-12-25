import Router from "./router.js"
import View from "./view.js";


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
    static addRoute(route, callback) {
        if (typeof route !== "string") throw new Error("Invalid 'route' provided. It must be a string!")
        
        if (typeof callback !== "function") throw new Error("Invalid 'callback' provided. It must be a function!")


        this._routes[this._routePrefix + route] = {
            template: callback,
            middlewares: [],
            title : ""
        };

        this._currentRoute = route;

        return this;
    }

    /**
     * @param {string} prefix 
     * @param {function} callback 
     * @returns {Route}
     */
    static group(prefix, callback) {
        if (typeof prefix !== "string" || !prefix.startsWith("/")) throw new Error("Invalid 'prefix' provided. It must be a string!")
        
        if (typeof callback !== "function") throw new Error("Invalid 'callback' provided. It must be a function!")

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
        if (!Array.isArray(middlewares)) throw new Error("Invalid 'middlewares' provided. It must be an array!")

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

    /**
     * Set route page title
     * @param {string} value
     * @returns {void}
     */
    static title(value) {
        if (typeof value !== "string") throw new Error("Invalid 'value' provided. It must be a string!")

        this._routes[this._routePrefix + this._currentRoute]["title"] = value
    }

    /**
     * @param {string} to - Route pointer  
     * @returns {string}
     */
    static redirect(to, window = window) {
        if (typeof to !== "string" || !to.startsWith("/")) throw new Error("Invalid 'to' provided. It must be a string starting route with \"/\"!")

        if (!(window instanceof Window)) throw new Error("Invalid 'window' provided. It must be a Window object!")

        this._setRouteToURL(to, window)

        const { view } = this._routes[to];

        return View.render(view)
    }
}