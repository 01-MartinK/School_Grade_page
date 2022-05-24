// prequisitions
const express = require('express');
const cors = require('cors')
    // const path = require('path');
const app = express();
app.use(cors()) // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body
let users = [
    { personalId: '0', name: "Admin Teacher", password: "Pass", isAdmin: true, email: 'Admin', school: 'Admin School' },
    { personalId: '1', name: "Kevin Hartman", password: "Pass", isAdmin: false, email: 'User', school: 'VOCO', eriala: 'Java arendaja' },
    { personalId: '2', name: "Teacher", password: "Pass", isAdmin: true, email: 'Teacher', school: 'Teacher School' }
]

let sessions = [{
        userId: '0',
        id: 'Admin'
    },
    {
        userId: '1',
        id: 'User'
    },
    {
        userId: '2',
        id: 'Teacher'
    }
]

// Function to check that the user is an admin
function requireAdmin(req, res, next) {
    // Check that the sessionId is present
    if (!req.body.sessionId) {
        return res.status(400).send({ error: 'You have to login' })
    }
    // Check that the sessionId is valid
    const sessionUser = sessions.findBy('userId', req.body.sessionId);
    if (!sessionUser) {
        return res.status(401).send({ error: 'Invalid sessionId' })
    }
    // Check that the sessionId in the sessions has user in it
    const user = users.findBy('personalId', sessionUser.userId);
    if (!user) {
        return res.status(400).send({ error: 'SessionId does not have an user associated with it' })
    }
    // Check that the user is an admin
    if (!user.isAdmin) {
        return res.status(400).send({ error: 'Insufficient permissions' })
    }
    next()
}
Array.prototype.findById = function(value) {
    return this.findBy('id', parseInt(value))
}
Array.prototype.findBy = function(field, value) {
    return this.find(function(x) {
        return x[field] === value;
    })
}


const temp_scores = [
    { text: "Enne töö, siis lõbu.", student: "Kevin Hartman" },
    { text: "Vana karu tantsima ei õpi.", student: "Uno Erik" },
]

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
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'pug');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'))

/*
app.get('/student/kutseope', (req, res) => {
    res.render('student');
});

app.get('/API/LEADERBOARD', (req, res) => {
    res.send(temp_scores)
})

app.get('/student/info', (req, res) => {
    res.render('student_info');
});
app.post('/API/GRADES', (req, res) => {
    let temp_grades2 = temp_grades.filter((grade) => grade.personalId === (req.body.sessionId));
    res.send(temp_grades2)
})
app.get('/API/ALLGRADES', (req, res) => {
    res.send(temp_grades)
})
app.get('/API/SCHEDULE', (req, res) => {
    res.send(temp_classes)
})

app.get('/API/LETTERS', (req, res) => {
    res.send(temp_letters)
})
app.get('/API/SUBJECT_BY_USER', (req, res) => {
    res.send(temp_subjects)
})
app.get('/API/LEADERBOARD', (req, res) => {
    res.send(temp_scores)
})
app.post('/API/ADMIN/STUDENTS', requireAdmin, (req, res) => {
    let temp_admin = users.filter((user) => user.isAdmin === false);
    res.send(temp_admin)
})
app.post('/API/ADMIN/CHECK', requireAdmin, (req, res) => {
    res.send({ admin: true })
})
app.delete('/API/ADMIN/STUDENTS', requireAdmin, (req, res) => {
    users = users.filter((user) => user.name !== req.body.name);
    let temp_admin = users.filter((user) => user.isAdmin === false && user.name !== req.body.name);
    res.send(temp_admin)
})
app.post('/API/ADMIN/TEACHERS', requireAdmin, (req, res) => {
    let temp_admin = users.filter((user) => user.isAdmin === true);
    res.send(temp_admin)
})
app.post('/API/ADMIN/SUBJECTS', requireAdmin, (req, res) => {
    res.send(temp_subjects)
})
app.get('/admin', (req, res) => {
    res.render('admin');
});

app.get('/teacher', (req, res) => {
    res.render('teacher/teacherMain')
})
*/

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/student/info', (req, res) => {
    res.render('student_info')
})

app.get('/student/kutseope', (req, res) => {
    res.render('student');
});

const APIRouter = require('./routers/api');
const TeacherAPIRouter = require('./routers/teacher/teacherApi');

app.use('/API', APIRouter);
app.use('/API', TeacherAPIRouter);

const server = app.listen(3010, () => {
    console.log(`Express running -> PORT ${server.address().port}`)
});