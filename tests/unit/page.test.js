import { JSDOM } from "jsdom"
import Page from "../../src/page.js" 


describe("Page tests", () => {
    let documentInstance
    const titles = {
        default : "SPA Page",
        custom : "Custom Page",
    }

    beforeEach(() => {
        const { window : { document } } = new JSDOM(`
            <html>
                <head>
                    <title>${titles["default"]}</title>
                </head>
                <body>
                    <a href='/'>Home page</a>
                </body>
            </html>
        `)
    
        documentInstance = document

        Page.setDocument(documentInstance)
    })


    it("should prevent instantiation of the class", () => {
        expect(() => new Page).toThrow()
    })

    it("should set page default title", () => {
        Page.setRootTitle(documentInstance.title)

        expect(Page.getRootTitle()).toBeDefined()
        expect(Page.getRootTitle()).toBe(titles["default"])
        expect(typeof Page.getRootTitle()).toBe("string")
    })
 
    it("should set custom page title", () => {
        Page.setTitle(titles["custom"])

        expect(Page.getTitle()).toBeDefined()
        expect(Page.getTitle()).toBe(titles["custom"])
        expect(typeof Page.getTitle()).toBe("string")
    })
})