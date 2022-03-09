import http from 'http';
import fs from 'fs';
import requests from 'requests';

const mainFile = fs.readFileSync('./index.html', 'utf-8');
// console.log(mainFile);

const replaceVal = (tempVal, orgVal)=>{
    let temperatur = tempVal.replace("{%tempVal%}", orgVal.main.temp)
     temperatur = temperatur.replace("{%tempMin%}", orgVal.main.temp_min)
     temperatur = temperatur.replace("{%tempMax%}", orgVal.main.temp_max)
     temperatur = temperatur.replace("{%location%}", orgVal.name)
     temperatur = temperatur.replace("{%country%}", orgVal.sys.country)
    //  console.log(temperatur);
     return temperatur
}


const server = http.createServer((req, res)=>{
    if (req.url === "/") {
        requests('https://api.openweathermap.org/data/2.5/weather?q=udaipur&appid=64f0dc728fc040cc4f277e4c25477f30&units=metric')
        .on('data', (chunk) =>{
            const objData = JSON.parse(chunk)
            const arrayJson = [objData]
            
            // console.log(arrayJson)
            // console.log(arrayJson[0].main.temp)

            const realTimeData = arrayJson.map((val)=>{ replaceVal(mainFile, val) }).join("")
            console.log(realTimeData);
            res.writeHead(200,{'Content-type':'text/html'})
            res.end(realTimeData)
        }).on('end', (err) =>{
             if (err) return console.log('connection closed due to errors', err);
             console.log('end');
             res.end()
});
    }
})

server.listen(8000, '127.0.0.1', ()=>{
    console.log("Listening on Port 8000");
})
