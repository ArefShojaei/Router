import { JSDOM } from "jsdom";
import Selector from "../../src/utils/selector.js";


describe("Selector tests", () => {
    it("should protect to create instance of class", () => {
        expect(() => new Selector).toThrow();
    });

    it("should get all anchor elements", () => {
        const dom = new JSDOM(`
            <html>
                <head></head>
                <body>
                    <a href='/'>Home page</a>
                    <a href='/products'>Products page</a>
                    <a href='/blog'>Blog page</a>
                </body>
            </html>
        `);

        const anchorElement = "a";

        const links = Selector.findAll(anchorElement, dom.window.document).getElements();


        expect(typeof links).toBe("object")
    });

    it("should get title of link", () => {
        const dom = new JSDOM(`
            <html>
                <head></head>
                <body>
                    <a href='/'>Home page</a>
                    <a href='/products'>Products page</a>
                    <a href='/blog'>Blog page</a>
                </body>
            </html>
        `);

        const anchorElement = "a";

        Selector.findAll(anchorElement, dom.window.document).each(anchor => {
            const link = anchor.getAttribute("href")

            expect(typeof link).toBe("string")
        })
    })
});
