const net = require('net');
let localeLanguage = null;
let charset = null;
let startCollecting = false;
let listToSort = [];
let sortedList = [];

net.createServer((serverSocket) => {

    serverSocket.on('data', (data) => {

        let lines = data.toString().split('\r\n');
        if (lines[0].search(/POST\s\/\s/i) !== -1)
        {
            lines.forEach((line) => {

                if ($match = /Accept-Language: ([^,]*)/i.exec(line)) {
                    localeLanguage = $match[1];
                }

                if ($match = /Content-Type:.*charset=(.*)/i.exec(line)) {
                    charset = $match[1];
                }

                if (localeLanguage !== null && line === '' && startCollecting === false) {
                    startCollecting = true;
                }

                if (startCollecting) {
                    let items = line.toString(charset).split(/\r|\n/);
                    items.forEach((item) => item !== '' && listToSort.push(item));
                }
            });
        }

        if (listToSort.length > 0) {
            sortedList = bubbleSortLocale(listToSort);

            /*=== Response Start ===*/
            responseHeader(serverSocket, "200 OK");
            sortedList.forEach((item) => serverSocket.write(item + '\r\n'));
        }
        else
        {
            responseHeader(serverSocket, "404 Not Found");
            serverSocket.write('Please set an locale and send not an empty body')
        }

        /*=== Response End ===*/
        serverSocket.end();
        localeLanguage = null;
        charset = null;
        startCollecting = false;
        listToSort = [];
        sortedList = [];

    });

}).listen(8000);

function responseHeader (socket, status)
{
    socket.write(`HTTP/1.1 ${status}\r\n`);
    socket.write('Content-Type: text/html; charset=utf-8\r\n');
    socket.write('\r\n');
}

function bubbleSortLocale(array, locales) {
    let bubbled;
    do {
        bubbled = false;
        for (let index=0; index < array.length-1; index++)
        {
            if (array[index].localeCompare(array[index+1], "de-DE") > 0) {
                let cache = array[index];
                array[index] = array[index+1];
                array[index+1] = cache;
                bubbled = true;
            }
        }
    } while (bubbled);

    return array;
}