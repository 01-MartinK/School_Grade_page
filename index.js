// prequisitions
const express = require('express');
const path = require('path');
const app = express();

// bodyParser Use
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'pug');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'))

// render default page
app.get('/student/kutseope', (req, res) => {
    res.render('student');
});

app.get('/student/info', (req, res) => {
    res.render('student_info');
});

const APIRouter = require('./routers/api');

app.use('/API', APIRouter);


const server = app.listen(3010, () => {
    console.log(`Express running -> PORT ${server.address().port}`)
});