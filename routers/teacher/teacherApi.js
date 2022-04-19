const express = require('express');

const router = express.Router();

var temp_students = [
    { name: "Margit Mägi", ala: "Programmeerimine" },
    { name: "Alex Suur", ala: "Keevitamine" },
    { name: "Indrek Alex", ala: "Botaanika" },
]

router.get('/students', (req, res) => {
    res.send(temp_students)
})

module.exports = router;