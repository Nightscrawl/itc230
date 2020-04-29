const http = require("http"), novels = require("./lib/data.js");

http.createServer( (req,res) => {  // callback, function to be invoked later

    const path = req.url.toLocaleLowerCase();

    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(`There are ${novels.getAll().length} novels in the Dragon Age series.`);  // http://localhost:3000
            break;

        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(`My name is Kira Abell. I am working toward my AAS in web development at Seattle Central College.`);  // http://localhost:3000/about
            break;

        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end(`404 Error`);
            break;

    }

} ).listen(process.env.PORT || 3000);
