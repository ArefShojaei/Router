import { JSDOM } from "jsdom"
import Router from "../../src/router.js"


describe("Router tests", () => {
    let documentInstance
    let windowtInstance
    let selectorID

    beforeEach(() => {
        const { window } = new JSDOM(`
            <html>
                <head>
                    <title>SPA Page</title>
                </head>
                <body>
                    <div id='root'></div>
                </body>
            </html>
        `)

        const { document } = window


        documentInstance = document
        windowtInstance = window
        selectorID = "#root"
    })


    it("should prevent instantiation of the class", () => {
        expect(() => new Router).toThrow()
    })

    it("should configure router", () => {
        expect(() => {
            Router.configure({
                window : windowtInstance,
                document : documentInstance,
                selector : selectorID
            })
        }).not.toThrow()
    })

    it("should run router", () => {
        expect(() => {
            Router.configure({
                window : windowtInstance,
                document : documentInstance,
                selector : selectorID
            })
    
            Router.run()
        }).not.toThrow()
    })
})