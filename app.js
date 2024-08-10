require('express-async-errors')
const express = require('express');
const app = express()
const compression = require('compression');
const mrogan = require('morgan')
const UserRouter = require('./route/mockRoute');
const morgan = require('morgan');

// middlewares 

app.use(compression())
app.use(express.json())
app.use(morgan('tiny'))
    // routes 


app.use('/users', UserRouter)




const PORT = 5000

app.listen(PORT, () => console.log(`Port is listening at port ${PORT}...`))