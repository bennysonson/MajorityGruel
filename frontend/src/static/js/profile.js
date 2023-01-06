import api from './APIClient.js';

fetch('/api/users/current')
   .then((response) => {
     if (response.ok) {
         return response.json();
     } else {
         document.location = "/login";
     }
    }).then(data => {
     fillProfileData(data)
    }).catch((error) => console.error("FETCH ERROR:", error));

function fillProfileData(user) {
     const username = document.querySelector('#username');
     const name = document.querySelector('#name');

     username.innerHTML = user.username
     name.innerHTML = user.first_name + ' ' + user.last_name;

     const logoutButton = document.querySelector('#logoutButton');

     logoutButton.addEventListener('click', e => {

         api.logOut().then(success => {
             alert("You have successfully logged out!");
             document.location = "/login";
         }).catch((err) => {
             console.log("error logging out (profile.js)")
         });
       });
 }