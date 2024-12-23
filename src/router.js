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
        const { title, view } = this.routes[route] ?? this.tmpRoute

        const renderedTemplate = view()

        Page.setPageTitle(title)
        
        document.querySelector("#root").innerHTML = renderedTemplate
    }

    static activeHistroyNavigation() {
        window.addEventListener("popstate", e => {
            const route = e.target.location.pathname

            this.injectRouteTemplateToDOM(route)
        })
    }

    static changeRoutebyRequest() {
        const { pathname } = location

        this.injectRouteTemplateToDOM(pathname)
    }

    static changeRoutebyLink() {
        document.querySelectorAll("a").forEach(el => {
            el.addEventListener("click", e => {
                e.preventDefault()

                const link = e.target.getAttribute("href")

                this.setRouteToURL(link)

                this.injectRouteTemplateToDOM(link)
            })
        })
    }

    static run() {
        this.activeHistroyNavigation()

        this.changeRoutebyRequest()

        this.changeRoutebyLink()
    }
}