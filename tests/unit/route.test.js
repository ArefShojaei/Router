import { JSDOM } from "jsdom"
import Route from "../../src/route.js";


describe("Route tests", () => {
    it("should add a single route", () => {
        Route.addRoute("/", () => "Welcome Page")

        expect(Route._routes["/"]).toBeDefined()
        expect(typeof Route._routes["/"]).toBe("object")
    })
    
    it("should add the group route", () => {
        Route.group("/auth", () => {
            Route.addRoute("/login", () => "Login page")
            Route.addRoute("/register", () => "Register page")
        })

        expect(Route._routes["/auth/login"]).toBeDefined()
        expect(Route._routes["/auth/register"]).toBeDefined()
        expect(typeof Route._routes["/auth/login"]).toBe("object")
        expect(typeof Route._routes["/auth/register"]).toBe("object")
    })

    it("should set route page title", () => {
        Route.addRoute("/products", () => "Products Page").title("Products | SPA")
    
        const { title } = Route._routes["/products"]

        expect(title).toBeDefined()
        expect(typeof title).toBe("string")
        expect(title).toEqual("Products | SPA")
    })

    it("should redirect route", () => {
        const { window } = new JSDOM(`<html><head></head><body></body></html>`, { url : "http://localhost:8000" })

        Route.addRoute("/", () => "Welcome Page")
        Route.addRoute("/products", () => Route.redirect("/", window))
        
        const { template } = Route._routes["/products"]

        expect(typeof template).toBe("function")
        expect(template()).toEqual("Welcome Page")
    })

    it("should add middleware", () => {
        const logger = () => console.log("[INFO] Log message")

        Route.addRoute("/", () => "Welcome Page").middleware([logger])

        const { middlewares } = Route._routes["/"]
    
        expect(middlewares).toBeDefined()
        expect(Array.isArray(middlewares)).toBe(true)
    })
})