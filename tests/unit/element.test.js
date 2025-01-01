import { JSDOM } from "jsdom"
import Element from "../../src/utils/element"


describe("Element tests", () => {
    let documentInstance

    beforeEach(() => {
        const { window : { document } } = new JSDOM(`
            <html>
                <head>
                    <title>SPA Page</title>
                </head>
                <body>
                    <a href='/'>Home page</a>
                </body>
            </html>
        `)

        documentInstance = document
    })


    it("should prevent instantiation of the class", () => {
        expect(() => new Element).toThrow()
    })

    it("should fire click event", () => {
        const link = documentInstance.querySelector("a")

        Element.onClick(link , (event) => expect(typeof event).toBe(Event))
    })
})