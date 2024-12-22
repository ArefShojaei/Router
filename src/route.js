import Router from "./router.js"


export default class Route extends Router {    
    static addRoute(route, callback) {
        this.routes[this.routePrefix + route] = {
            view: callback,
            middlewares: [],
        };

        this.currentRoute = route;

        return this;
    }
}