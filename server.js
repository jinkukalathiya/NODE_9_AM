const http = require('http');
const port = 9000;
const fs = require('fs');
const requestHandler = (req, res) => {
    // console.log(req.url);
    let fileName = "";

    switch(req.url)
    {
        case '/':
            fileName = "./home.html";
        break;
        case '/about':
            fileName = "./about.html";
        break;
        case '/service':
            fileName = "./service.html";
        break;
        case '/contact':
            fileName = "./contact.html";
        break;
        default:
            fileName = "./error.html";
        break;
    }
    fs.readFile(fileName,(err,result) => {
        if(!err){
            res.end(result);
        }
    })
}

const server = http.createServer(requestHandler);

server.listen(port,(err) => {
    if(err){
        console.log("Server not Start");
        return false;
    }
    console.log("Server start on port : "+port);
})