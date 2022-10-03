const requestURL = 'api/users'

// GET All Users
const getTableUser = (users) => {

    $("#allUserTable tr").remove()
    const table = document.getElementById('allUserTable')

    users.forEach(user => {

        const rolesNames = []
        user.roles.forEach(role => {
            rolesNames.push(role.name.substring(5))
        })

        const newRow = table.insertRow(-1)
        newRow.insertCell(0).innerText = user.id
        newRow.insertCell(1).innerText = user.firstName
        newRow.insertCell(2).innerText = user.lastName
        newRow.insertCell(3).innerText = user.age
        newRow.insertCell(4).innerText = user.email
        newRow.insertCell(5).innerText = rolesNames.join(' ')

        const cloneEditButton = document.getElementById('buttonEditForm').cloneNode(true)
        cloneEditButton.addEventListener('click', () => fillEditModal(user.id))
        newRow.insertCell(6).appendChild(cloneEditButton)

        const cloneDeleteButton = document.getElementById('buttonDeleteForm').cloneNode(true)
        cloneDeleteButton.addEventListener('click', () => fillDeleteModal(user.id))
        newRow.insertCell(7).appendChild(cloneDeleteButton)
    })
}

fetch(requestURL)
    .then(res => res.json())
    .then(data => getTableUser(data))


const refreshUsersTable = () => {
    fetch(requestURL)
        .then(res => res.json())
        .then(data => {
            getTableUser(data)
        })
}


function fillEditModal(id) {
    $('#editModalUser').modal('show')
    fetch(requestURL + '/' + id)
        .then(res => res.json())
        .then(data => {
            document.getElementById('idEdit').value = data.id
            document.getElementById('firstNameEdit').value = data.firstName
            document.getElementById('lastNameEdit').value = data.lastName
            document.getElementById('ageEdit').value = data.age
            document.getElementById('emailEdit').value = data.email
            document.getElementById('passwordEdit').value = ""
            document.getElementById('rolesEdit').value = "1"
        })
    document.getElementById('buttonEditUser')
        .addEventListener('click', () => putUser(id))
}

function fillDeleteModal(id) {
    $('#deleteModalUser').modal('show')
    fetch(requestURL + '/' + id)
        .then(res => res.json())
        .then(data => {
            document.getElementById('idDelete').value = data.id
            document.getElementById('firstNameDelete').value = data.firstName
            document.getElementById('lastNameDelete').value = data.lastName
            document.getElementById('ageDelete').value = data.age
            document.getElementById('emailDelete').value = data.email
        })
    document.getElementById('buttonDeleteUser')
        .addEventListener('click', () => deleteUser(id))
}

function getRoles(selector) {
    let collection = selector.selectedOptions
    let rolesNewUser = []
    for (let i = 0; i < collection.length; i++) {
        if (collection[i].value === '1') {
            rolesNewUser.push({
                id: 1,
                name: 'ROLE_ADMIN'
            })
        }
        if (collection[i].value === '2') {
            rolesNewUser.push({
                id: 2,
                name: 'ROLE_USER'
            })
        }
    }
    return rolesNewUser
}

// POST
async function createNewUser() {

    let rolesNewUser = getRoles(document.getElementById('rolesNew'))

    fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: document.getElementById('firstNameNew').value,
            lastName: document.getElementById('lastNameNew').value,
            age: document.getElementById('ageNew').value,
            email: document.getElementById('emailNew').value,
            password: document.getElementById('passwordNew').value,
            roles: rolesNewUser
        })
    })
        .then(() =>  {
            setTimeout(() => {
                refreshUsersTable()
            }, 250)
            document.forms['newUserForm'].reset();
            $('.nav-tabs button[href="#userInfo"]').tab('show');
        })
}

//PATCH
function putUser(id) {

    let rolesNewUser = getRoles(document.getElementById('rolesEdit'))

    fetch(requestURL + '/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: document.getElementById('idEdit').value,
            firstName: document.getElementById('firstNameEdit').value,
            lastName: document.getElementById('lastNameEdit').value,
            age: document.getElementById('ageEdit').value,
            email: document.getElementById('emailEdit').value,
            password: document.getElementById('passwordEdit').value,
            roles: rolesNewUser
        })
    })
        .then(() =>  {
            setTimeout(() => {
                refreshUsersTable()
            }, 250)
            $('#editModalUser').modal('hide')
        })
}


//DELETE
function deleteUser(id) {
    fetch(requestURL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then(() =>  {
            setTimeout(() => {
                refreshUsersTable()
            }, 250)
            $('#deleteModalUser').modal('hide')
        })
}