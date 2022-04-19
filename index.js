// prequisitions
const express = require('express');
const cors = require('cors')
    // const path = require('path');
const app = express();
app.use(cors()) // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body
const users = [
    { personalId: '0', name: "Admin", password: "Pass", isAdmin: true, email: 'Admin', school: 'Admin School' },
    { personalId: '1', name: "Kevin Hartman", password: "Pass", isAdmin: false, email: 'User', school: 'User School' }
]

let sessions = [{
        userId: '0',
        id: 'Admin'
    },
    {
        userId: '1',
        id: 'User'
    }
]

const temp_scores = [
    { text: "Enne töö, siis lõbu.", student: "Kevin Hartman" },
    { text: "Vana karu tantsima ei õpi.", student: "Uno Erik" },
]
Array.prototype.findById = function(value) {
    return this.findBy('id', parseInt(value))
}
Array.prototype.findBy = function(field, value) {
    return this.find(function(x) {
        return x[field] === value;
    })
}

app.post('/users', (req, res) => {
    if (!req.body.name || !req.body.password || !req.body.personalId || !req.body.email || !req.body.school) {
        return res.status(400).send({ error: 'One or multiple params are missing' })
    }
    let personalId = users.findBy('personalId', req.body.personalId);
    if (personalId) {
        return res.status(409).send({ error: 'Conflict: The personal Id already exists, you have already made an account with this id. Contact support if you think you did not create an account. ' })
    }
    let email = users.findBy('email', req.body.email);
    if (email) {
        return res.status(409).send({ error: 'Conflict: The email already exists. Press Forgot password to send account details to the email.' })
    }
    users.push({ personalId: req.body.personalId, name: req.body.name, password: req.body.password, isAdmin: false, email: req.body.email, school: req.body.school })
    user = users.findBy('personalId', req.body.personalId);
    let newSession = {
        userId: user.personalId,
        id: req.body.email
    }
    sessions.push(newSession)
    res.status(201).send({ sessionId: sessions.findBy('id', req.body.email).userId })
})


app.post('/sessions', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    const user = users.find((user) => user.email === req.body.email && user.password === req.body.password);
    if (!user) {
        return res.status(401).send({ error: 'Unauthorized: email or password is incorrect' })
    }
    let newSession = {
        userId: user.personalId,
        id: req.body.email
    }
    sessions.push(newSession)
    res.status(201).send({ sessionId: sessions.findBy('id', req.body.email).userId })
})


app.delete('/sessions', (req, res) => {
        sessions = sessions.filter((session) => session.userId === req.body.sessionId);
        res.status(200).end()
    })
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

app.get('/API/LEADERBOARD', (req, res) => {
    res.send(temp_scores)
})

app.get('/student/info', (req, res) => {
    res.render('student_info');
});

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/teacher', (req, res) => {
    res.render('teacher/teacherMain')
})

const APIRouter = require('./routers/api');
const TeacherAPIRouter = require('./routers/teacher/teacherApi');

app.use('/API', APIRouter);
app.use('/API', TeacherAPIRouter);

const server = app.listen(3010, () => {
    console.log(`Express running -> PORT ${server.address().port}`)
});