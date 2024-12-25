import { JSDOM } from "jsdom";
import Selector from "../../src/utils/selector.js";


describe("Selector tests", () => {
    let document

    beforeEach(() => {
        const { window : { document } } = new JSDOM(`
            <html>
                <head></head>
                <body>
                    <a href='/'>Home page</a>
                    <a href='/products'>Products page</a>
                    <a href='/blog'>Blog page</a>
                </body>
            </html>
        `)

        document = document
    })


    it("should prevent instantiation of the class", () => {
        expect(() => new Selector).toThrow();
    });

    it("should get all anchor elements", () => {
        const links = Selector.findAll("a", document).getElements();


        expect(typeof links).toBe("object")
    });

    it("should get title of link", () => {
        Selector.findAll("a", document).each(anchor => {
            const link = anchor.getAttribute("href")

            expect(typeof link).toBe("string")
        })
    })
});
