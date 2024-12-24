import { JSDOM } from "jsdom"
import Element from "../../src/utils/element"


describe("Element tests", () => {
    it("should protect to create instance of class", () => {
        expect(() => new Element).toThrow()
    })


    it("should fire click event", () => {
        const dom = new JSDOM(`
            <html>
                <head></head>
                <body>
                    <a href='/'>Home page</a>
                </body>
            </html>
        `)
        
        const anchorElement = dom.window.document.querySelector("a")

        Element.onClick(anchorElement , (event) => {
            expect(typeof event).toBe("object")
        })
    })
})