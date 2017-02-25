#!/usr/bin/env node

const HOST = '0.0.0.0';
const PORT = 8887;

var http = require("http"),
    url  = require("url"),
    path = require("path"),
    fs   = require("fs");

http.createServer(function (req, res) {
    if(req.url === "/login") {
        login(req, res);
        
        return;
    }


    var pathname = __dirname + url.parse(req.url).pathname;
    if (path.extname(pathname) == "") {
        pathname += "/";
    }

    if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += "index.html";
    }

    fs.exists(pathname, function(exists) {
        if(exists) {
            switch(path.extname(pathname)) {
                case ".html":
                    res.writeHead(200, {"Content-Type": "text/html"});
                    break;
                case ".js":
                    res.writeHead(200, {"Content-Type": "text/javascript"});
                    break;
                case ".css":
                    res.writeHead(200, {"Content-Type": "text/css"});
                    break;
                case ".gif":
                    res.writeHead(200, {"Content-Type": "image/gif"});
                    break;
                case ".jpg":
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                    break;
                case ".png":
                    res.writeHead(200, {"Content-Type": "image/png"});
                    break;
                default:
                    res.writeHead(200, {"Content-Type": "application/octet-stream"});
            }

            fs.readFile(pathname, function (err, data) {
                res.end(data);
            });
        } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("<h1>404 Not Found</h1>");
        }
    });

}).listen(PORT, HOST);

console.log(`Server running at http://${HOST}:${PORT}/`);

function login(req, res) {    
    res.writeHead(200, {"Content-Type": "text/json"});

    res.end(console.log(req));
}
