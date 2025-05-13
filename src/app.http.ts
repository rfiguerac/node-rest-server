import http from 'http';
import fs from 'fs'

const server = http.createServer( (req, res) => {

    console.log(req.url);

    // res.writeHead(200
    // res.write('<h1>hola mundo! </h1>');
    // res.end();

    // const data = {name: 'ricardo', age : 30, city : 'maracay'};
    // res.writeHead(200,{'content-type' : 'application/json'});
    // res.end(JSON.stringify(data));

    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html','utf-8');
        res.writeHead(200, {'content-type' : 'text/html'});
        res.end(htmlFile);
        return;
    }


});

server.listen(8080, () =>{
    console.log('Server running on port 8080');
});