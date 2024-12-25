import { JSDOM } from "jsdom"
import Element from "../../src/utils/element"


describe("Element tests", () => {
    let DOM

    beforeEach(() => {
        const { window : { document } } = new JSDOM(`
            <html>
                <head></head>
                <body>
                    <a href='/'>Home page</a>
                </body>
            </html>
        `)

        DOM = document
    })


    it("should prevent instantiation of the class", () => {
        expect(() => new Element).toThrow()
    })

    it("should fire click event", () => {
        const links = DOM.querySelector("a")

        Element.onClick(links , (event) => {
            
            expect(typeof event).toBe("object")
        }, { HTMLElement })
    })
})