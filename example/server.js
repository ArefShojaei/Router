const express = require("express");
const path = require("path");
const app = express()
const PORT = 8000

app.use(express.static(path.join(__dirname)))

app.get("*", (req, res) => {
    try {
        const filePath = path.join(__dirname, "index.html")

        res.status(200).sendFile(filePath)
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => console.log(`Server is running -> http://localhost:${PORT}`))