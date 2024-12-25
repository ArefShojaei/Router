import View from "../../src/view.js"


describe("View tests", () => {
    it("should protect to create instance of class", () => {
        expect(() => new View).toThrow()
    })


    it("should render view (template) without view param", () => {
        const page = () => {
            return `
                <div>
                    <h1>Welcome Page</h1>
                    <p>This is SPA page!</p>
                </div>
            `
        } 

        const renderedTemplate = View.render(page)

        expect(typeof renderedTemplate).toBe("string")
    })

    it("should render view (template) with view param", () => {
        const page = ({ id, name }) => {
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

        const renderedTemplate = View.render(page, user)

        expect(typeof renderedTemplate).toBe("string")
        expect(renderedTemplate).toMatch(`<p>ID: ${user.id}  -  Name: ${user.name}</p>`)
    })
})