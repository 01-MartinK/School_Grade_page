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
            console.log(result[0].lisaAined)
            let b = JSON.parse(result[0].lisaAined).ained
            console.log(b)
            b.forEach(element => {
                html += `<div class="class">
                    <h5>${element}</h5>
                    <h6>${element.opetaja}</h6>
                    <button class="btn btn-info btn-outline-dark">Liitu</h1>
                </div>
                <br>`
            });
            document.querySelector('.classesList').innerHTML = html
        })
}

async function getTeachers() {
    let html = '';
    let ained = '';
    await (await fetch('http://localhost:3010/API/TEACHERS')).json()
        .then(result => {
            result.forEach(element => {
                JSON.parse(element.ained).forEach(aine => {
                    ained += `${aine}, `
                })
                html += `<div class="opetaja card card-body">
                    <h3 class="card-title">${element.nimi}</h3>
                    <div class="ained card-text">
                        <h6>
                        ${ained}
                        </h6>  
                    </div>
                </div>`
                ained = ''
            });
            document.querySelector('.teachersList').innerHTML = html
        })
}

genExtraClasses()
getTeachers()