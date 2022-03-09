import http from 'http';
import fs from 'fs';
import axios from 'axios';
import path  from 'path';


const server = http.createServer((req, res)=>{
    let filePath = '.' + req.url;
    if (filePath == './'){ filePath = './index.html';}

    let extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.ico':
            contentType = 'image/ico';
            break;
    }

    const mainFile = fs.readFileSync(filePath, 'utf-8');


    axios.get('https://api.openweathermap.org/data/2.5/weather?q=london&appid=64f0dc728fc040cc4f277e4c25477f30&units=metric')
  .then(function (response) {
    if (res.statusCode === 200) {
      
      res.writeHead(200,{'Content-type':contentType})
      const replaceVal = (tempVal, orgVal, res)=>{
          let temperatur = tempVal.replace("{%tempVal%}", orgVal.data.main.temp)
           temperatur = temperatur.replace("{%tempMin%}", orgVal.data.main.temp_min)
           temperatur = temperatur.replace("{%tempMax%}", orgVal.data.main.temp_max)
           temperatur = temperatur.replace("{%location%}", orgVal.data.name)
           temperatur = temperatur.replace("{%country%}", orgVal.data.sys.country)
      //    console.log(temperatur);
          res.end(temperatur)
          return temperatur
      }
      replaceVal(mainFile, response, res)
      // console.log(response.data.main.temp);
    }

    else if(req.url == 'ENOENT'){
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(replaceVal(mainFile, response, res), 'utf-8');
        
      
    }

  })
  .catch(function (error) {
    // handle error
    
    console.log(error);
    res.end()
  })
  .then(function () {
    // always executed
    
  });
})

server.listen(8000, '127.0.0.1', ()=>{
    console.log("Listening on Port 8000");
})  