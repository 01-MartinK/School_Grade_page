function showOp() {
    document.querySelector('#KBtn').classList.remove('active')
    document.querySelector('#OpBtn').classList.add('active')

    document.querySelector('.classes').classList.add('d-none')
    document.querySelector('.opetajad').classList.remove('d-none')

}

function showK() {
    document.querySelector('#KBtn').classList.add('active')
    document.querySelector('#OpBtn').classList.remove('active')

    document.querySelector('.classes').classList.remove('d-none')
    document.querySelector('.opetajad').classList.add('d-none')
}

async function genExtraClasses() {
    let html = '';
    await (await fetch('http://localhost:3010/API/EXTRA_CLASSES')).json()
        .then(result => {
            result.forEach(element => {
                html += `<div class="class">
                    <h5>${element.name}</h5>
                    <h6>${element.opetaja}</h6>
                    <h6>${element.aeg}</h6>
                    <button class="btn btn-info btn-outline-dark">Liitu</h1>
                </div>`
            });
            document.querySelector('.classesList').innerHTML = html
        })
}

async function getTeachers() {
    let html = '';
    await (await fetch('http://localhost:3010/API/TEACHERS')).json()
        .then(result => {
            result.forEach(element => {
                html += `<div class="opetaja card card-body">
                    <h3 class="card-title">${element.name}</h3>
                    <div class="ained card-text">
                        <h4>${element.ained}</h4>
                        <h5>${element.klass}</h4>
                    </div>
                </div>`
            });
            document.querySelector('.opetajaNimekiri').innerHTML = html
        })
}

genExtraClasses()
getTeachers()