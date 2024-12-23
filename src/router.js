import Page from "./page.js"
import View from "./view.js";


export default class Router {
    static _routes = {};
    static _currentRoute = "";
    static _routePrefix = "";
    static _tmpRoute = {
        title : "404",
        middlewares : [],
        view : () => "404 | Page not found!"
    }


    static _setRouteToURL(route) {
        history.pushState({}, "", route)
    }

    static #injectTemplateToDOM(route) {
        const { title, view, middlewares } = this._routes[route] ?? this._tmpRoute

        Page.setTitle(title)
        
        this.#applyMiddlewares(middlewares)
        
        document.querySelector("#root").innerHTML = View.render(view)
    }

    static #activeHistroyNavigation() {
        window.addEventListener("popstate", e => {
            const route = e.target.location.pathname

            this.#injectTemplateToDOM(route)
        })
    }

    static #changeRoutebyRequest() {
        const { pathname } = location

        this.#injectTemplateToDOM(pathname)
    }

    static #changeRoutebyLink() {
        document.querySelectorAll("a").forEach(el => {
            el.addEventListener("click", e => {
                e.preventDefault()

                const route = e.target.getAttribute("href")

                this._setRouteToURL(route)

                this.#injectTemplateToDOM(route)
            })
        })
    }

    static #applyMiddlewares(middlewares) {
        middlewares.length && middlewares.forEach(middleware => middleware())
    }

    static run() {
        Page.setRootTitle(document.title)

        this.#activeHistroyNavigation()

        this.#changeRoutebyRequest()

        this.#changeRoutebyLink()
    }
}