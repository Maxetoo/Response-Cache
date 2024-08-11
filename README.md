
# Caching Response to Memory on Server

The purpose of this project is to improve API performance and capabilities through memory caching and response payload compression.

## Nodejs Compression Middleware

Install compression

```javascript
npm install compression
```

Usage
```javascript
const compression = require('compression')
const express = require('express')
const app = express()
 
// compress all responses
app.use(compression())
```

[Link to Compression Docs](https://www.npmjs.com/package/compression)


## Node Cache

Install node-Cache

```javascript
npm i node-cache
```

Usage/Example
```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache();

const memoryCache = (req, res, next) => {
   
    // is request a GET?
    // if not, call next

    if (req.method !== 'GET') {
        console.error('Cannot cache non-GET methods!');
        return next();
    }

    // check if key exists in cache 
    const key = req.originalUrl
    const cachedResponse = cache.get(key);

    console.log(`Key: ${key}`);

    // if it exits, send cache result
    if (cachedResponse) {
        console.log(`Cache hit for ${key}`);
        res.json({ users: cachedResponse })
    } else {
        console.log(`Cache miss for ${key}`);
        res.originalJson = res.json;
        res.json = body => {
            res.originalJson(body)
            cache.set(key, body, 300)
        }

        next()
    }
    // if not, replace .json() with method to set response to cache 
}

module.exports = memoryCache
```

[Link to Node Cache](https://www.npmjs.com/package/node-cache)

## More Note
We are caching response to memory on the server (RAM) and not memory disk or browser memory. Hence, data access is faster but volatile and prone to loss if the server restarts or crashes




