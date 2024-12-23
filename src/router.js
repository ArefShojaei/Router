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
    
    static _tmpRoute = {
        title : "404",
        middlewares : [],
        view : () => "404 | Page not found!"
    }


    constructor() {
        throw new Error(`${new.target.name} class must not be called with \"new\" keyword!`)
    }
    
    /**
     * 
     * @param {string} route
     * @returns {void} 
     */
    static _setRouteToURL(route) {
        history.pushState({}, "", route)
    }

    /**
     * 
     * @param {string} route
     * @returns {void} 
     */
    static #injectTemplateToDOM(route) {
        const { title, view, middlewares } = this._routes[route] ?? this._tmpRoute

        Page.setTitle(title)
        
        this.#applyMiddlewares(middlewares)
        
        document.querySelector("#root").innerHTML = View.render(view)
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
     * @param {array} middlewares
     * @returns {void}
     */
    static #applyMiddlewares(middlewares) {
        middlewares.length && middlewares.forEach(middleware => middleware())
    }

    /**
     * @returns {void}
     */
    static run() {
        Page.setRootTitle(document.title)

        this.#activeHistroyNavigation()

        this.#changeRoutebyRequest()

        this.#changeRoutebyLink()
    }
}