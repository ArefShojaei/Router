import { JSDOM } from "jsdom"
import Page from "../../src/page.js" 


describe("Page tests", () => {
    let document

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
    
        document = document

        Page.setRootTitle(document.title)
    })


    it("should prevent instantiation of the class", () => {
        expect(() => new Page).toThrow()
    })

    it("should set root page title", () => {
        expect(Page.getRootTitle()).toBeTruthy()
    })

    it("should set custom page title", () => {
        Page.setTitle("Custom Page Title!")

        expect(Page.getTitle()).toBeTruthy()
    })
})