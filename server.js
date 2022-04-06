const http = require("http");
const PORT = process.env.PORT || 3000;

let users = require('./data')

const server = http.createServer((req, res) => {
    if (req.url === "/users") {
        switch (req.method) {
            case "GET":
                getUsers(res);
                break;
            case "POST":
                postUsers(req, res);
                break;
            case "PUT":
                updateUsers(req, res);
                break;
            default:
                getWrongStatus(res);
        }
    }
    else
        getWrongStatus(res);
});

function getUsers(res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
}

function postUsers(req, res) {
    body = '';

    req.on('data', (chunk) => body += chunk)

    req.on('end', () => {
        postBody = JSON.parse(body);
        users.push(postBody);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(postBody));
    });
}

function updateUsers(req, res) {
    body = '';

    req.on('data', (chunk) => body += chunk)

    req.on('end', () => {
        postBody = JSON.parse(body);
        users = postBody;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(postBody));
    });
}

function getWrongStatus(res) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
}

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
