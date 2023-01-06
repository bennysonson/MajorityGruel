import api from './APIClient.js';


const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const submitButton = document.querySelector('#submit');

submitButton.addEventListener('click', e => {

// api.logIn(username.value, password.value).then(userData => {
//   localStorage.setItem('user', JSON.stringify(userData.user));
//   document.location = "/";
// }).catch((err) => {

//   errorBox.classList.remove("hidden");
//   errorBox.innerHTML = err;
// });

// let user = {

//   user_first_name: firstName.value,
//   user_last_name: lastName.value,
//   user_username: username.value,
//   user_password: password,
//   user_salt: "48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9",
//   user_avatar: "",
//   user_favorites: ""
// }


let user = {

    first_name: firstName.value,
    last_name: lastName.value,
    username: username.value,
    password: password.value,
    salt: "48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9",
    avatar: "",
    favorites: ""
}

api.register(user).then(data => {
    
    document.location = "/login";
    }).catch((err) => {
    // errorBox.classList.remove("hidden");
    // errorBox.innerHTML = err;
    });


// fetch('/api/users', {
//   method: 'POST',
//   body: JSON.stringify(user),
//   headers: {
//     'Content-Type': 'application/json',
//   }
// }).then(handleError).then(res => {
//   return res.json();
// });

});