import { JSDOM } from "jsdom"
import Page from "../../src/page.js" 


describe("Page tests", () => {
    it("should protect to create instance of class", () => {
        expect(() => new Page).toThrow()
    })

    it("should set root page title", () => {
        const dom = new JSDOM(`
            <html>
                <head>
                    <title>SPA Page</title>
                </head>
                <body>
                    <a href='/'>Home page</a>
                </body>
            </html>
        `)
        
        const document = dom.window.document

        Page.setDocument(document)

        Page.setRootTitle(document.title)

        const isSetRootPageTitle = Page.getRootTitle() ? true : false

        expect(isSetRootPageTitle).toBeTruthy()
    })

    it("should set custom page title", () => {
        const dom = new JSDOM(`
            <html>
                <head>
                    <title>SPA Page</title>
                </head>
                <body>
                    <a href='/'>Home page</a>
                </body>
            </html>
        `)
        
        const document = dom.window.document

        Page.setDocument(document)

        Page.setRootTitle(document.title)

        Page.setTitle("Custom Page Title!")

        const isSetPageTitle = Page.getTitle() ? true : false

        expect(isSetPageTitle).toBeTruthy()
    })
})