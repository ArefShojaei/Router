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


    static init() {}
}