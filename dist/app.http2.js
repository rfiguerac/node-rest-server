"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http2_1 = __importDefault(require("http2"));
const fs_1 = __importDefault(require("fs"));
const server = http2_1.default.createSecureServer({
    key: fs_1.default.readFileSync('./keys/server.key'),
    cert: fs_1.default.readFileSync('./keys/server.crt'),
}, (req, res) => {
    console.log(req.url);
    // res.writeHead(200
    // res.write('<h1>hola mundo! </h1>');
    // res.end();
    // const data = {name: 'ricardo', age : 30, city : 'maracay'};
    // res.writeHead(200,{'content-type' : 'application/json'});
    // res.end(JSON.stringify(data));
    if (req.url === '/') {
        const htmlFile = fs_1.default.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(htmlFile);
        return;
    }
});
server.listen(8080, () => {
    console.log('Server running on port 8080');
});
