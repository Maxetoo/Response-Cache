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