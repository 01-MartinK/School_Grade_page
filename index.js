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
app.get('/', (req, res) => {
    res.status(200).end()
})

app.post('/users', (req, res) => {
    if (!req.body.name || !req.body.password || !req.body.personalId || !req.body.email || !req.body.school) {
        return res.status(400).send({error: 'One or multiple params are missing'})
    }
    let personalId = users.findBy('personalId', req.body.personalId);
    if (personalId) {
        return res.status(409).send({error: 'Conflict: The personal Id already exists. '})
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

const server = app.listen(3010, () => {
    console.log(`Express running -> PORT ${server.address().port}`)
});