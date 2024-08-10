const express = require('express')
const UserRouter = express.Router();
const { getUsers } = require('../controller/mockDataController');
const routeCache = require('../middleware/routeCache');


UserRouter.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const end = Date.now();
        const diffSeconds = (end - start) / 1000
        console.log(`${req.method} ${req.url} completed in ${diffSeconds} seconds`);
    })
    next()
})

UserRouter.route('/').get(routeCache, getUsers)


module.exports = UserRouter