async function genStudents() {
    let list = document.querySelector('.studentsList')
    let html = ''
    const localId = localStorage.getItem("sessionId")
    const data = { sessionId: localId };
    students = await (await fetch('http://localhost:3010/API/ADMIN/STUDENTS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })).json()
        .then(result => {
            result.forEach(element => {
                    html += `<div class="students">
                        <h5>${element.name}</h5><button onclick="failStudent('${element.name}', this)">Läbikukkuta</button>
                </div>`
            });
        })
    list.innerHTML = html
}
async function failStudent(name) {
    let list = document.querySelector('.studentsList')
    let html = ''
    const localId = localStorage.getItem("sessionId")
    const data = { sessionId: localId, name: name };
    students = await (await fetch('http://localhost:3010/API/ADMIN/STUDENTS', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })).json()
        .then(result => {
            result.forEach(element => {
                html += `<div class="students">
                        <h5>${element.name}</h5><button onclick="failStudent('${element.name}', this)">Läbikukkuta</button>
                </div>`
            });
        })
    list.innerHTML = html
}

async function genTeachers() {
    let list = document.querySelector('.teachersList')
    let html = ''
    const localId = localStorage.getItem("sessionId")
    const data = { sessionId: localId };
    teachers = await (await fetch('http://localhost:3010/API/ADMIN/TEACHERS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })).json()
        .then(result => {
            result.forEach(element => {
                    html += `<div class="teachers">
                        <h5>${element.name}</h5>
                </div>`
            });
        })
    list.innerHTML = html
}

async function genSubjects() {
    let list = document.querySelector('.subjectsList')
    let html = ''
    const localId = localStorage.getItem("sessionId")
    const data = { sessionId: localId };
    teachers = await (await fetch('http://localhost:3010/API/ADMIN/SUBJECTS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })).json()
        .then(result => {
            result.forEach(element => {
                html += `<div class="subjects">
                        <h5>${element.name}</h5>
                </div>`
            });
        })
    list.innerHTML = html
}

genStudents()

genTeachers()

genSubjects()

function showSs() {
    document.querySelector("#SssBtn").classList.remove("active")
    document.querySelector("#SsBtn").classList.add("active")
    document.querySelector("#TtBtn").classList.remove("active")
    document.querySelector(".students").classList.remove("d-none")
    document.querySelector(".teachers").classList.add("d-none")
    document.querySelector(".subjects").classList.add("d-none")
}

function showTt() {
    document.querySelector("#SssBtn").classList.remove("active")
    document.querySelector("#SsBtn").classList.remove("active")
    document.querySelector("#TtBtn").classList.add("active")
    document.querySelector(".students").classList.add("d-none")
    document.querySelector(".teachers").classList.remove("d-none")
    document.querySelector(".subjects").classList.add("d-none")
}

function showSss() {
    document.querySelector("#SssBtn").classList.add("active")
    document.querySelector("#SsBtn").classList.remove("active")
    document.querySelector("#TtBtn").classList.remove("active")
    document.querySelector(".students").classList.add("d-none")
    document.querySelector(".teachers").classList.add("d-none")
    document.querySelector(".subjects").classList.remove("d-none")
}