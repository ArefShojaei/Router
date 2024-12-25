import View from "../../src/view.js"


describe("View tests", () => {
    it("should prevent instantiation of the class", () => {
        expect(() => new View).toThrow()
    })

    it("should render a template without params", () => {
        const template = () => {
            return `
                <div>
                    <h1>Welcome Page</h1>
                    <p>This is SPA page!</p>
                </div>
            `
        } 

        const renderedTemplate = View.render(template)

        expect(typeof renderedTemplate).toBe("string")
        expect(renderedTemplate).toContain("<h1>Welcome Page</h1>")
        expect(renderedTemplate).toContain("<p>This is SPA page!</p>")
    })

    it("should render a template with params", () => {
        const template = ({ id, name }) => {
            return `
                <div>
                    <h1>User Page</h1>
                    <p>ID: ${id}  -  Name: ${name}</p>
                </div>
            `
        } 

        const user = {
            id : 1,
            name : "Robert"
        }

        const renderedTemplate = View.render(template, user)

        expect(typeof renderedTemplate).toBe("string")
        expect(renderedTemplate).toContain(`<h1>User Page</h1>`)
        expect(renderedTemplate).toContain(`<p>ID: ${user.id}  -  Name: ${user.name}</p>`)
    })
})