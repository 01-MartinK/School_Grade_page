const express = require('express');

const router = express.Router();
const APIcontroller = require('../controllers/API');

router.get('/GRADES', APIcontroller.get_grade_by_student)

router.get('/SCHEDULE', APIcontroller.get_schedule)

router.get('/LETTERS', APIcontroller.get_letters)

router.get('/SUBJECT_BY_USER', APIcontroller.get_subjects)

router.get('/EXTRA_CLASSES', APIcontroller.get_extra_subjects)

router.get('/TEACHERS', APIcontroller.get_teachers)

router.post('/GRADES', APIcontroller.get_students)

module.exports = router;