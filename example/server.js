const fs = require('fs');
const path = require('path');

require('http').createServer((req, res) => {

    fs.readFile(path.join(__dirname + "/index.html"), { encoding : "utf-8" }, (err, data) => {
        if (err) throw new Error(err)


        res.writeHead(200, { "content-type" : "text/html" })
        res.write(data)
        res.end()
    })

}).listen(8000)