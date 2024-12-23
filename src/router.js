import Page from "./page.js"


export default class Router {
    static routes = {};
    static currentRoute = "";
    static routePrefix = "";
    static tmpRoute = {
        title : "404",
        middlewares : [],
        view : () => "404 | Page not found!"
    }


    static setRouteToURL(route) {
        history.pushState({}, "", route)
    }

    static injectTemplateToDOM(route) {
        const { title, view, middlewares } = this.routes[route] ?? this.tmpRoute

        const renderedTemplate = view()

        Page.setTitle(title)
        
        this.applyMiddlewares(middlewares)
        
        document.querySelector("#root").innerHTML = renderedTemplate
    }

    static activeHistroyNavigation() {
        window.addEventListener("popstate", e => {
            const route = e.target.location.pathname

            this.injectTemplateToDOM(route)
        })
    }

    static changeRoutebyRequest() {
        const { pathname } = location

        this.injectTemplateToDOM(pathname)
    }

    static changeRoutebyLink() {
        document.querySelectorAll("a").forEach(el => {
            el.addEventListener("click", e => {
                e.preventDefault()

                const route = e.target.getAttribute("href")

                this.setRouteToURL(route)

                this.injectTemplateToDOM(route)
            })
        })
    }

    static applyMiddlewares(middlewares) {
        middlewares.length && middlewares.forEach(middleware => middleware())
    }

    static run() {
        Page.setRootTitle(document.title)

        this.activeHistroyNavigation()

        this.changeRoutebyRequest()

        this.changeRoutebyLink()
    }
}