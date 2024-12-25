import { JSDOM } from "jsdom"
import Route from "../../src/route.js";


describe("Route tests", () => {
    it("shoud add single route", () => {
        Route.addRoute("/", () => "Welcome Page")

        const route = Route._routes["/"]

        expect(typeof route).toBe("object")
    })
    
    it("shoud add the group route", () => {
        Route.group("/auth", () => {
            Route.addRoute("/login", () => "Login page")
            Route.addRoute("/register", () => "Register page")
        })
    })

    it("shoud set route page title", () => {
        Route.addRoute("/products", () => "Products Page").title("Products | SPA")
    
        const { title } = Route._routes["/products"]

        expect(title).toEqual("Products | SPA")
    })

    it("shoud redirect route", () => {
        const { window } = new JSDOM(`<html><head></head><body></body></html>`, { url : "http://localhost:8000" })

        Route.addRoute("/", () => "Welcome Page")
        Route.addRoute("/products", () => Route.redirect("/", window))
        
        const { view } = Route._routes["/products"]

        
        expect(view()).toEqual("Welcome Page")
    })

    it("should add middleware", () => {
        const Logger = () => console.log("[INFO] Log message")

        Route.addRoute("/", () => "Welcome Page").middleware([Logger])

        const { middlewares } = Route._routes["/"]
    
        expect(typeof middlewares).toBe("object")
    })
})