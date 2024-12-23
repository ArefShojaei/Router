![spa](https://github.com/user-attachments/assets/a7248971-3bcd-4754-9f18-a227570b1013)

## <center>**JavaScript Router for SPA**</center> 

<br/>

```js
import { Router, Route } from "@aref-shojaei/router"


// Add route
Route.addRoute("/", () => "Welcome Page")

// Group routes
Route.addRoute("/dashboard", () => {
    Route.addRoute("/profile", () => "Profile Page")
    Route.addRoute("/comments", () => "Comments Page")
})

// Redirect route
Route.addRoute("/redirection", () => Route.redirect("/"))


Router.run()
```