let http = require('http');
let url = require('url');
let fs = require('fs');


let server = http.createServer((req, res) => {
    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandlers;
    if (typeof router[trimPath] === 'undefined') {
        chosenHandlers = handlers.notfound;
    }
    else {
        chosenHandlers = router[trimPath];
    }
    chosenHandlers(req, res);
});

server.listen(3000, () => {
    console.log('Running on port 3000!');
})

let handlers = {};
let getTemplate = (req, res, path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        }
    });
}
handlers.home = (req, res) => {
    getTemplate(req, res, 'home.html');
}
handlers.login = (req, res) => {
    getTemplate(req, res, 'login.html');
    
}
handlers.profile = (req, res) => {
    getTemplate(req, res, 'profile.html');
}
handlers.notfound = (req, res) => {
    getTemplate(req, res, 'notfound.html');
}

let router = {
    '': handlers.home,
    'login': handlers.login,
    'profile': handlers.profile,
}