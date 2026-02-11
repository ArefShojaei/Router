const path = require("path");

module.exports = {
    entry : path.join(__dirname,  "index.js"),
    output : {
        path : path.join(__dirname, "dist"),
        filename : "router.min.js",
    },
    module : {
        rules : [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use : {
                    loader : "babel-loader",
                    options : {
                        presets : ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
}