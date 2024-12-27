![spa](https://github.com/user-attachments/assets/a7248971-3bcd-4754-9f18-a227570b1013)


<h1 align='center'>Router - SPA Application</h1>


```js
import { Router, Route } from "@aref-shojaei/router"


// Confgiure router system
Router.configure({ window, document })


// Single Route
Route.addRoute("/", () => "Welcome Page")

// Group Routes
Route.group("/auth", () => {
    Route.addRoute("/login", () => "Login Page")
    Route.addRoute("/register", () => "Register Page")
})

// Dynamic Route
Route.addRoute("/users/{id}", ({ params : { name } }) => `User#${id} Page`)


// Redirect Routes
Route.addRoute("/redirection", () => Route.redirect("/"))


// Initialize the router
Router.run()
```

##  Guide :
1. [Introduction](#introduction)
    * [What is this library ?](#what-is-this-library)
    * [Why should I use it ?](#why-should-i-use-it)
    * [Is it work like SPA ?](#is-it-work-like-spa)
2. [installation](#installation)
3. [tutorial](#tutorial)

<br/>

## Introduction

<br/>

### What is this library ?
> This library is for handling routes in the browser env by HTTP requests!

```bash
* Back-end:
[Request] GET /blog  => [Response] HTML | JSON


* Front-end:
Page -> [Route] /blog -> Update content -> without refereshing -> Render template
```

<br>

### Why should I use it ?
> If you like to have application or pages not to need to referesh again for every action | request + high performance for loading content (SPA)

<br>

### Is it work like SPA ?
> Sure You can get this options to use the library:
* Add Signle Route
* Add the group routes
* Add middleware to every routes (back-end concept)
* Add route redirection
* Add pages as component or template files to specific route
* More ...

<br>

## Installation

> NPM
```bash
npm i @aref-shojaei/router
```

> Yarn
```bash
yarn add @aref-shojaei/router
```

<br/>

> Setup - app.js

```js
import { Router , Route } from "@aref-shojaei/router"

Route.addRoute("/", () => "Welcome Page")

Router.run()
```
**Note: Don't forget to read guides again!**

<br/>

## Tutorial

> Route
* Single type
* Group type
* Dynamic type

```js
import { Route } from "@aref-shojaei/router"

// Single route
Route.addRoute("/", () => "Welcome Page")

// Group routes
Route.group("/auth", () => {
    Route.addRoute("/login", () => "Welcome Page")
    Route.addRoute("/register", () => "Welcome Page")
})

// Dynamic route with params
Route.addRoute("/users/{id}", ({ params : { id } }) => `User #{id} Page`)

Route.addRoute("/courses/{category}/{name}", ({ params : { category, name } }) => `Course Detail: '${category}/${name}'  Page`)
```

<br/>

> Middleware

* Note: Midddleware is a function to call before every routes

```js
import { Route } from "@aref-shojaei/router"


// Middleware
const logger = () => console.log("[LOG] my custom middleware")


// Single route with middleware
Route.addRoute("/", () => "Welcome Page").middleware([logger])

// Group routes with middleware
Route.group("/auth", () => {
    Route.addRoute("/login", () => "Welcome Page")
    Route.addRoute("/register", () => "Welcome Page")
}).middleware([logger])
```

<br/>

> Route Redirection

```js
import { Route } from "@aref-shojaei/router"

Route.addRoute("/auth/login", () => "Welcome Page")
Route.addRoute("/dashboard", () => Route.redirect("/auth/login"))
```

<br/>

> Route page title

* Note: If I don't use it, page title is applied from document.title by default!

```js
import { Route } from "@aref-shojaei/router"

Route.addRoute("/", () => "Welcome Page").title("Custom Page Title | SPA")
```