// prequisitions
const express = require('express');
const cors = require('cors')
// const path = require('path');
const app = express();
app.use(cors())        // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body
const users = [
    {personalId: null, name: "Admin", password: "Password", isAdmin: true, email: null, school: null},
    {personalId: null, name: "User", password: "Password", isAdmin: false, email: null, school: null}
]

let sessions = []



const temp_grades = [
    { subject: "Mathematics", grades: [3, 2, 4, 3, 4, 4, 3, 5, 4] },
    { subject: "Matemaatika", grades: [3, 2, 4, 3, 4, 4, 3, 5, 4] },
    { subject: "Drugate", grades: [4, 4, 5, 5, 5, 5, 5] },
    { subject: "Keemia", grades: [4, 4, 5, 5, 5, 5, 5] },
    { subject: "Biology", grades: [4, 5, 4, 5, 5, 5, 3, 4, 5] },
    { subject: "Bioloogia", grades: [4, 5, 4, 5, 5, 5, 3, 4, 5] },
]

const temp_classes = [
    { name: "Proga", time: "14.00-16.00", subjects: ["math", "programming"], teacher: "Margit Mägi" },
    { name: "Matta", time: "17.00-18.00", subjects: ["trigonometry", "simple equations"], teacher: "Anne mootse" },
]

const temp_letters = [
    { text: "lorem jasopidjasopidj aspod jasüp djaspodj aspo djpaosjd poasjd poaj dpojasp odjas d", teacher: "Margit Mägi", class: "Proga" },
    { text: "lorem jasopidjasopidj aspod jasüp djaspodj aspo djpaosjd poasjd poaj dpojasp odjas d", teacher: "Anne Mootse", class: "Mathematics" },
]

const temp_subjects = [
    { name: "Keemia", progress: "läbitud" },
    { name: "Matemaatika", progress: "pooleli" },
    { name: "Eesti keel", progress: "läbikukkunud" }
]

const temp_scores = [
    { text: "Enne töö, siis lõbu.", student: "Kevin Hartman"},
    { text: "Vana karu tantsima ei õpi.", student: "Uno Erik"},
]

// Function to check that the user is an admin
/*
function requireAdmin(req, res, next) {
    // Check that the sessionId is present
    if (!req.body.sessionId) {
        return res.status(400).send({error: 'You have to login'})
    }

    // Check that the sessionId is valid
    const sessionUser = sessions.find((session) => session.id === parseInt(req.body.sessionId));
    if (!sessionUser) {
        return res.status(401).send({error: 'Invalid sessionId'})
    }

    // Check that the sessionId in the sessions has user in it
    const user = users.findById(sessionUser.userId);
    if (!user) {
        return res.status(400).send({error: 'SessionId does not have an user associated with it'})
    }

    // Check that the user is an admin
    if (!user.isAdmin) {
        return res.status(400).send({error: 'Insufficient permissions'})
    }
    next()
}
*/
Array.prototype.findById = function (value) {
    return this.findBy('id', parseInt(value))
}
Array.prototype.findBy = function (field, value) {
    return this.find(function (x) {
        return x[field] === value;
    })
}

app.post('/users', (req, res) => {
    if (!req.body.name || !req.body.password || !req.body.personalId || !req.body.email || !req.body.school) {
        return res.status(400).send({error: 'One or multiple params are missing'})
    }
    let personalId = users.findBy('personalId', req.body.personalId);
    if (personalId) {
        return res.status(409).send({error: 'Conflict: The personal Id already exists, you have already made an account with this id. Contact support if you think you did not create an account. '})
    }
    let email = users.findBy('email', req.body.email);
    if (email) {
        return res.status(409).send({error: 'Conflict: The email already exists. Press Forgot password to send account details to the email.'})
    }
    users.push({personalId: req.body.personalId, name: req.body.name, password: req.body.password, isAdmin: false, email: req.body.email, school: req.body.school})
    user = users.findBy('personalId', req.body.personalId);
    let newSession = {
        userId: user.personalId,
        id: req.body.email
    }
    sessions.push(newSession)
    res.status(201).send({sessionId: sessions.findBy('id', req.body.email).userId })
})
app.post('/sessions', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({error: 'One or all params are missing'})
    }
    const user = users.find((user) => user.email === req.body.email && user.password === req.body.password);
    if (!user) {
        return res.status(401).send({error: 'Unauthorized: email or password is incorrect'})
    }
    let newSession = {
        userId: user.personalId,
        id: req.body.email
    }
    sessions.push(newSession)
    res.status(201).send(
        {sessionId: sessions.findBy('id', req.body.email).userId}
    )
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
app.get('/', (req, res) => {
    res.render('index');
});

// render school page
app.get('/student/kutseope', (req, res) => {
    res.render('schoolPage');
});
app.get('/student/info', (req, res) => {
    res.render('student_info');
});
app.get('/API/GRADES', (req, res) => {
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
const server = app.listen(3010, () => {
    console.log(`Express running -> PORT ${server.address().port}`)
});