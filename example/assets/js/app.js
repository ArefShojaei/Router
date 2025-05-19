Router.configure({ window, document })

Route.add("/", () => "Welcome Page")
Route.add("/users", () => "Users Page")
Route.add("/users/{name}", ({ params : { name } }) => `User #${name} Page`)
Route.add("/redirection", () => Route.redirect("/"))

Router.run()