const express = require('express');

const router = express.Router();

const temp_grades = [
    { subject: "Matemaatika", grades: [3, 2, 4, 3, 4, 4, 3, 5, 4] },
    { subject: "Keemia", grades: [4, 4, 5, 5, 5, 5, 5] },
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

const extra_subjects = [
    { name: "Java", opetaja: "Margit Mägi", aeg: "23-EKAP" },
    { name: "Füüsika", opetaja: "Arnu Poorel", aeg: "45-EKAP" },
    { name: "Kunst", opetaja: "Kristi Kirs", aeg: "12-EKAP" }
]

const teachers = [
    { name: "Margit Mägi", ained: "Proge, Java", klass: "A101" },
    { name: "Anne Mootse", ained: "matemaatika, lamaatika", klass: "A410" },
]

router.get('/GRADES', (req, res) => {
    res.send(temp_grades)
})

router.get('/SCHEDULE', (req, res) => {
    res.send(temp_classes)
})

router.get('/LETTERS', (req, res) => {
    res.send(temp_letters)
})

router.get('/SUBJECT_BY_USER', (req, res) => {
    res.send(temp_subjects)
})

router.get('/EXTRA_CLASSES', (req, res) => {
    res.send(extra_subjects)
})

router.get('/TEACHERS', (req, res) => {
    res.send(teachers)
})

module.exports = router;