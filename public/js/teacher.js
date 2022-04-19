async function generateStudents() {
    await (await fetch('http://localhost:3010/API/students')).json()
        .then(result => {
            let html = ""
            result.forEach(element => {
                console.log(element)
                html += `<div class="student">
                    <div class="info">
                    <h3>${element.name}</h3>
                    <h5>${element.ala}</h5>
                    </div>
                    <button class="btn btn-primary">Rohkem Infot</button>
                </div>`
            });
            document.querySelector(".student-list").innerHTML = html
        })
}

generateStudents()

function showO() {
    document.querySelector(".subjects").classList.add("d-none")
    document.querySelector(".students").classList.remove("d-none")

    document.querySelector("#tpBtn").classList.add("active")
    document.querySelector("#pBtn").classList.remove("active")
}

function showT() {
    document.querySelector(".subjects").classList.remove("d-none")
    document.querySelector(".students").classList.add("d-none")

    document.querySelector("#tpBtn").classList.remove("active")
    document.querySelector("#pBtn").classList.add("active")
}