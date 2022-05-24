const con = require('../utils/db');

const get_students = (req, res) => {
    let query = `SELECT * FROM OPILASED;`
    con.query(query, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
}

const get_schedule = (req, res) => {
    let currentClass;
    let query = `SELECT ajakava, ained FROM KLASSID;`
    con.query(query, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
}

const get_letters = (req, res) => {
    let currentClass;
    let query = `SELECT kirjad FROM KLASSID;`
    con.query(query, (err, result) => {
        if (err) throw err;
        res.send(result[0].kirjad)
    })
}

const get_teachers = (req, res) => {
    let school;
    let query = `SELECT * FROM OPETAJAD;`
    con.query(query, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
}

const get_subjects = (req, res) => {
    let currentClass;
    let query = `SELECT ained FROM KLASSID;`
    con.query(query, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
}

const get_extra_subjects = (req, res) => {
    let school;
    let query = `SELECT lisaAined FROM KOOLID;`
    con.query(query, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
}

const get_grade_by_student = (req, res) => {
    let student;
    let query = `SELECT hinded FROM OPILASED;`
    con.query(query, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
}

const get_teacher_data = (req, res) => {
    let teacher_code;
    let query = `SELECT * FROM OPETAJAD;`
    con.query(query, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
}

const set_student_grade = (req, res) => {
    let student;
    let query = `UPDATE;`
}

const set_student_status = (req, res) => {
    let student;
    let query = `DELETE;`
}

const set_teacher_role = (req, res) => {
    let teacher;
    let query = `UPDATE`
}

module.exports = {
    get_students,
    get_subjects,
    get_extra_subjects,
    get_teachers,
    get_schedule,
    get_letters,
    get_grade_by_student,
    get_teacher_data,
    set_student_grade,
    set_student_status,
    set_teacher_role,
};