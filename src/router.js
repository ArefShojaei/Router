import Page from "./page.js"
import View from "./view.js";
import Selector from "./utils/selector.js";
import Element from "./utils/element.js";
import { InvalidArgumentTypeError } from "./exception.js"


/**
 * @abstract
 */
export default class Router {
    static _window

    static _document

    static _rootElement

    static _routes = {};
    
    static _currentRoute = "";
    
    static _routePrefix = "";
    
    static _defaultRoute = {
        title : "404",
        template : () => "404 | Page not found!",
        middlewares : [],
        meta : {
            params : {},
            query : {}
        }
    }


    constructor() {
        throw new Error(`${new.target.name} class must not be called with \"new\" keyword!`)
    }

    /**
     * @param {object} params 
     */
    static configure({ window, document, selector }) {
        if (!(window instanceof Window)) throw new InvalidArgumentTypeError("'window' must be a Window object!")
                    
        if (!(document instanceof Document)) throw new InvalidArgumentTypeError("'document' must be a Document object!")
        
        if (typeof selector !== "string") throw new InvalidArgumentTypeError("'selector' must be a string!")
        

        this._window = window

        this._document = document

        this._rootElement = selector
    }

    /**
     * @param {string} target 
     * @returns {object}
     */
    static #findRoute(target) {
        for (const route in this._routes) {
            const regex = new RegExp(`^${route.replace(/\{(\w+)\}/g, '(?<$1>[^/{}]+)')}$`);
        
            if (!regex.test(target)) continue

            const { groups } = regex.exec(target)

            this.#setRouteQuery(route)

            this.#setRouteParams(route, groups)

            return this._routes[route]
        }
    }

    /**
     * 
     * @param {string} route 
     * @returns {boolean}
     */
    static #setRouteQuery(route) {
        const query = {}
        
        const { search } = location
        
        if (!search.length) return false


        search.slice(1).split("&").forEach(item => {
            const [key, value] = item.split("=")
        
            query[key] = value
        })

        this._routes[route]["meta"]["query"] = {...query}
    }

    /**
     * @param {string} route 
     * @param {object} params
     * @returns {void} 
     */
    static #setRouteParams(route, params) {
        this._routes[route]["meta"]["params"] = {...params}
    }

    /**
     * 
     * @param {string} route
     * @param {Window} window
     * @returns {void} 
     */
    static _setRouteToURL(route) {
        if (typeof route !== "string" || !route.startsWith("/")) throw new InvalidArgumentTypeError("'route' must be a string starting with \"/\"!")

        this._window.history.pushState({}, "", route)
    }

    /**
     * @param {string} route
     * @returns {void} 
     */
    static #injectTemplateToDOM(route) {
        try {
            const { title, template, middlewares, meta } = this.#findRoute(route) ?? this._defaultRoute

            Page.setTitle(title)
            
            this.#applyMiddlewares(middlewares)
            
            this._document.querySelector(this._rootElement).innerHTML = View.render(template, meta)
        } catch (error) {
            console.error("Error to inject route template:", route, error);
        }
    }

    /**
     * @returns {void}
     */
    static #activeHistroyNavigation() {
        this._window.addEventListener("popstate", event => {
            const route = event.target.location.pathname

            this.#injectTemplateToDOM(route)
        })
    }

    /**
     * @returns {void}
     */    
    static #changeRoutebyRequest() {
        const { pathname } = location

        this.#injectTemplateToDOM(pathname)
    }

    /**
     * @returns {void}
     */
    static #changeRoutebyLink() {
        Selector.findAll("a", this._document).each(anchor => {
            Element.onClick(anchor, (event) => {
                event.preventDefault()

                const route = event.target.getAttribute("href")

                this._setRouteToURL(route)

                this.#injectTemplateToDOM(route)
            })
        })
    }

    /**
     * Executes middleware functions
     * @param {array} middlewares
     * @returns {void}
     */
    static #applyMiddlewares(middlewares) {
        try {
            middlewares.length && middlewares.forEach(middleware => middleware())
        } catch (error) {
            console.error("Error executing middleware:", error);
        }
    }

    /**
     * Initializes the router
     * @param {function} callback
     * @returns {void}
     */
    static run(callback = () => {}) {
        if (typeof callback !== "function") throw new InvalidArgumentTypeError("'callback' must be a function!")
        

        Page.setDocument(document)
        
        Page.setRootTitle(document.title)

        this.#activeHistroyNavigation()

        this.#changeRoutebyRequest()

        this.#changeRoutebyLink()

        callback()
    }
}