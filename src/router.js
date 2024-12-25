import Page from "./page.js"
import View from "./view.js";
import Selector from "./utils/selector.js";
import Element from "./utils/element.js";


/**
 * @abstract
 */
export default class Router {
    static _routes = {};
    
    static _currentRoute = "";
    
    static _routePrefix = "";
    
    static _defaultRoute = {
        title : "404",
        middlewares : [],
        template : () => "404 | Page not found!"
    }


    constructor() {
        throw new Error(`${new.target.name} class must not be called with \"new\" keyword!`)
    }
    
    /**
     * 
     * @param {string} route
     * @param {Window} window
     * @returns {void} 
     */
    static _setRouteToURL(route, window = window) {
        if (typeof route !== "string" || !route.startsWith("/")) throw new Error("Invalid 'route' provided. It must be a string starting with \"/\"!")

        if (!(typeof window instanceof Window)) throw new Error("Invalid 'window' provided. It must be a Window object!")

        window.history.pushState({}, "", route)
    }

    /**
     * @param {string} route
     * @returns {void} 
     */
    static #injectTemplateToDOM(route) {
        try {
            const { title, view, middlewares } = this._routes[route] ?? this._defaultRoute

            Page.setTitle(title)
            
            this.#applyMiddlewares(middlewares)
            
            document.querySelector("#root").innerHTML = View.render(template)
        } catch (error) {
            console.error("Error to inject route template:", route, error);
        }
    }

    /**
     * @returns {void}
     */
    static #activeHistroyNavigation() {
        window.addEventListener("popstate", e => {
            const route = e.target.location.pathname

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
        Selector.findAll("a").each(anchor => {
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
     * @param {Document} document
     * @returns {void}
     */
    static run(callback = () => {}, document = document) {
        if (typeof callback !== "function") throw new Error("Invalid 'callback' provided. It must be a function!")
        
        if (!(typeof callback instanceof Document)) throw new Error("Invalid 'document' provided. It must be an Document object!")

        Page.setDocument(document)
        
        Page.setRootTitle(document.title)

        this.#activeHistroyNavigation()

        this.#changeRoutebyRequest()

        this.#changeRoutebyLink()

        callback()
    }
}