# Homework 3 - Own Http Server

You can execute the script with the following command:

```sh
node index.js
```

The tcp server is now started on port 8000. 
Go on *localhost:8000* to show the actual counter iteration.
Go on *localhost:8000/visit* to count up.
With a POST request you can set the counter to a new value:
```sh
POST localhost:8000/{new value}
```