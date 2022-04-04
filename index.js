// prequisitions
const express = require('express');
const path = require('path');
const app = express();

const temp_grades = [
    { subject: "Mathematics", grades: [3, 2, 4, 3, 4, 4, 3, 5, 4] },
    { subject: "Drugate", grades: [4, 4, 5, 5, 5, 5, 5] },
    { subject: "Biology", grades: [4, 5, 4, 5, 5, 5, 3, 4, 5] },
]

const temp_classes = [
    { name: "Proga", time: "14.00-16.00", subjects: ["math", "programming"], teacher: "Margit Mägi" },
    { name: "Matta", time: "17.00-18.00", subjects: ["trigonometry", "simple equations"], teacher: "Anne mootse" },
]

const temp_letters = [
    { text: "lorem jasopidjasopidj aspod jasüp djaspodj aspo djpaosjd poasjd poaj dpojasp odjas d", teacher: "Margit Mägi", class: "Proga" },
    { text: "lorem jasopidjasopidj aspod jasüp djaspodj aspo djpaosjd poasjd poaj dpojasp odjas d", teacher: "Anne Mootse", class: "Mathematics" },
]

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

app.get('/API/GRADES', (req, res) => {
    res.send(temp_grades)
})

app.get('/API/SCHEDULE', (req, res) => {
    res.send(temp_classes)
})

app.get('/API/LETTERS', (req, res) => {
    res.send(temp_letters)
})

const server = app.listen(3010, () => {
    console.log(`Express running -> PORT ${server.address().port}`)
});