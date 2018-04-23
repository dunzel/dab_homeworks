const dns = require('dns');
dns.resolveTxt("dunzel.io", (error, adresses) => {
    console.log(error, adresses);
});