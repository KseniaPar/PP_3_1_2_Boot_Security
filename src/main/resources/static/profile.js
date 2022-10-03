$(async function () {
        await getProfile()
})


async function getProfile() {
        fetch('api/profile')
            .then(res => res.json())
            .then((user) => {

                let roles = user.roles.map(role => " " + role.name.substring(5));

                $('#userTitle').append(user.username)
                               .append(" with roles:")
                               .append(roles);

                if (!roles.includes(' ADMIN')) {
                    $('#adminLink').hide();
                }

                let userTable = `$(
                <tr scope="row">
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${roles}</td>)
                </tr>`;
                $('#profileUserTable').append(userTable);

            });
}