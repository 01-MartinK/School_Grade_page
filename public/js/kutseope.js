let grades = []

async function genGrades() {
    const list = document.querySelector('.grades')
    let html = ''
    let grades = ''

    grades = await (await fetch('http://localhost:3010/API/GRADES')).json()
        .then(result => {
            console.log(result)
            console.log(result[0].subject)
            result.forEach(element => {
                grades += `<p class="sub">${element.subject}</p>`
                element.grades.forEach(grade => {
                    if (grade < 3)
                        grades += `<p class="bad">${grade}</p>`;
                    else
                        grades += `<p>${grade}</p>`;
                })

                html += `
                            <div class="grade-line">
                            ${grades}
                            </div>
                        `
                grades = ''
                console.log(element)
            });
            list.innerHTML = html
        })
}

async function genSchedule() {
    const list = document.querySelector(".scheduleList")
    let schedule
    html = ""

    schedule = await (await fetch('http://localhost:3010/API/SCHEDULE')).json()
        .then(result => {
            result.forEach(element => {
                html += `<div class="class">
                    <div class="info">
                        <h3>${element.name}</h3>
                        <h6>${element.subjects}</h6>
                    </div>
                    <div class="info2">
                        <p>${element.time}</p>
                        <p>${element.teacher}</p>
                    </div>
                </div>`
            })
            list.innerHTML = html
        })

}

genGrades()

genSchedule()

function showH() {
    document.querySelector(".grades").classList.remove("d-none")
    document.querySelector(".schedule").classList.add("d-none")
    document.querySelector(".diary").classList.add("d-none")
}

function showTp() {
    document.querySelector(".grades").classList.add("d-none")
    document.querySelector(".schedule").classList.remove("d-none")
    document.querySelector(".diary").classList.add("d-none")
}

function showP() {
    document.querySelector(".grades").classList.add("d-none")
    document.querySelector(".schedule").classList.add("d-none")
    document.querySelector(".diary").classList.remove("d-none")
}