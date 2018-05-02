# Homework 4 - Sort API with Bubblesort

You can execute the script with the following command:

```sh
node index.js
```

The tcp server is now started on port 8000. 
Go on *localhost:8000* to show the actual counter iteration.
Use Postman for testing this application.
With a POST request you can set sort your request body
```sh
POST localhost:8000/ HTTP/1.1
Accept-Language: de-DE, de;q=0.9, en;q=0.8, fr;q=0.7, *;q=0.5

c
s
a
```

The output would be:

```sh
HTTP/1.1 200 OK
Content-Type: text/plain;charset=utf-8

a
c
s
```

You can also set an charset with adding the folliwing line inter the request header:

```sh
Content-Type: text/html; charset=utf-8 
```