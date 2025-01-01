import Route from "../../src/route.js"


describe("Route tests", () => {
    it("should add a single route", () => {
        const route = "/"
        const template = () => "Welcome Page"
        
        Route.addRoute(route, template)

        const routes = Route._routes

        expect(routes[route]).toBeDefined()
    })
    
    it("should add the group route", () => {
        const routePrefix = "/auth"
        const route = "/login"
        const template = () => "Login Page"
        
        Route.group(routePrefix, () => {
            Route.addRoute(route, template)
        })

        const routes = Route._routes

        expect(routes[routePrefix + route]).toBeDefined()
        expect(typeof routes[routePrefix + route]).toBe("object")
    })
    
    it("should add a dynamic route", () => {
        const route = "/users/{id}"
        const template = ({ params: { id } }) => `User #${id}`

        Route.addRoute(route, template)

        const routes = Route._routes

        expect(routes[route]).toBeDefined()
        expect(typeof routes[route]).toBe("object")
    })
    
    it("should add middleware to a route", () => {
        const route = "/admin"
        const template = () => "Admin Page"
        const loggerMiddleware = () => { message : "Custom Log Message!" } 

        Route.addRoute(route, template).middleware([loggerMiddleware])
    
        const routes = Route._routes

        expect(routes[route]["middlewares"]).toBeDefined()
        expect(typeof routes[route]["middlewares"]).toBe("object")
    })
    
    it("should add page title to a route", () => {
        const route = "/product"
        const template = () => "SPA Page"

        Route.addRoute(route, template).title("Custom page title (SPA)")
    
        const routes = Route._routes

        expect(routes[route]["title"]).toBeDefined()
        expect(typeof routes[route]["title"]).toBe("string")
    })
    
    it("should redirect route", () => {
        const welcomeRoute = "/"
        const redirectionRoute = "/redirection"
        const distRoute = welcomeRoute

        Route.addRoute("/", () => "Welcome Page")
        Route.addRoute("/redirection", () => Route.redirect(distRoute))
    
        const routes = Route._routes

        expect(routes[redirectionRoute]).toBeDefined()
        expect(typeof routes[redirectionRoute]).toBe("object")
        expect(routes[welcomeRoute]).toBeDefined()
        expect(typeof routes[welcomeRoute]).toBe("object")
    })
})