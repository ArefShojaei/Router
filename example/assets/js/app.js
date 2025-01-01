Router.configure({ window, document })

Route.addRoute("/", () => "Welcome Page")
Route.addRoute("/users", () => "Users Page")
Route.addRoute("/users/{name}", ({ params : { name } }) => `User #${name} Page`)
Route.addRoute("/redirection", () => Route.redirect("/"))

Router.run()