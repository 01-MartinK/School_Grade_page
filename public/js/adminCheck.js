async function adminCheck() {
    const testlist = document.querySelector('ul')
    let admin
    let html = ""
    const localId = localStorage.getItem("sessionId")
    const data = { sessionId: localId };
    admin = await (await fetch('http://localhost:3010/API/ADMIN/CHECK', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })).json()
        .then(result => {
            if (result.admin === true) {
                html += `<li class="mb-1 nav-item"><a class="nav-link link-dark" href="/admin">Administraator</a></li>`
            testlist.innerHTML += html}
        })
}
adminCheck()