const net = require('net');
const fs = require('fs');
let counter = 0;

fs.readFile('cache_counter.tmp', (err, data) => {
    if (!err) counter = parseInt(data);
});

net.createServer((serverSocket) => {

    serverSocket.on('data', (data) => {

        let lines = data.toString().split('\r\n');
        lines.forEach((line) => console.log(line));

        /*=== Response Start ===*/
        //Show Counter
        if (lines[0].search(/GET\s\/\s/i) !== -1)
        {
            returnCounter(serverSocket, counter);
        }
        //count up and show counter
        else if (lines[0].search(/GET\s\/visit/i) !== -1)
        {
            counter = setCounter(counter+1);
            returnCounter(serverSocket, counter);
        }
        //set new value and show counter
        else if ($match = /POST\s\/(\d*)/i.exec(lines[0])) {
            counter = setCounter($match[1]);
            returnCounter(serverSocket, counter);
        }
        //route not found
        else
        {
            responseHeader(serverSocket, "404 Not Found");
            serverSocket.write('Error 404');
        }

        /*=== Response End ===*/
        serverSocket.end();

    });

}).listen(8000);

function setCounter($c)
{
    fs.writeFile('cache_counter.tmp', $c);
    return parseInt($c);
}

function returnCounter (socket, counter)
{
    responseHeader (socket, "200 OK");
    socket.write(`Counter: ${counter}`);
}

function responseHeader (socket, status)
{
    socket.write(`HTTP/1.1 ${status}\r\n`);
    socket.write('Content-Type: text/html; charset=utf-8\r\n');
    socket.write('\r\n');
}