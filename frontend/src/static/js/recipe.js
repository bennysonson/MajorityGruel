let viewRecipe = JSON.parse(localStorage.getItem('viewRecipe'));
let currentUser = JSON.parse(localStorage.getItem('user'));

//Fill page with recipe info
document.getElementById('recipeName').innerHTML = viewRecipe.name;
document.getElementById('recipeDescription').innerHTML = viewRecipe.description;
document.getElementById('recipeDurationHours').value = viewRecipe.hours;
document.getElementById('recipeDurationMins').value = viewRecipe.minutes;

//fill photo
let image = new Image();
image.src = viewRecipe.img;
image.className = "img-fluid img-thumbnail";
image.width = "460";
image.height = "345";
image.id = "newImage";
// NO IMAGES RN
// document.getElementById('recipePhoto').append(image);

//disable stars
// document.getElementById('star-5').disabled = true;
// document.getElementById('star-4').disabled = true;
document.getElementById('star-3').disabled = true;
document.getElementById('star-2').disabled = true;
document.getElementById('star-1').disabled = true;

//set stars
// if (viewRecipe.difficulty == 5) {
//     document.getElementById('star-5').checked = true;
// } else if (viewRecipe.difficulty == 4) {
//     document.getElementById('star-4').checked = true;
// } else if (viewRecipe.difficulty == 3) {
//     document.getElementById('star-3').checked = true;
// } else if (viewRecipe.difficulty == 2) {
//     document.getElementById('star-2').checked = true;
// } else if (viewRecipe.difficulty == 1) {
//     document.getElementById('star-1').checked = true;
// }
if (viewRecipe.difficulty == 3) {
    document.getElementById('star-1').checked = true;
} else if (viewRecipe.difficulty == 2) {
    document.getElementById('star-2').checked = true;
} else if (viewRecipe.difficulty == 1) {
    document.getElementById('star-3').checked = true;
}

//set ingredients
let ingredients = viewRecipe.ingredients;

//parse through and add ingredients string
let ingredientsArray = ingredients.split(',.,');
for (const ingredient of ingredientsArray) {
    let newIngredient = document.createElement('li');
    newIngredient.className = 'list-group-item';
    newIngredient.innerHTML = ingredient;
    document.getElementById('ingredientList').append(newIngredient);
}

//set directions
let directions = viewRecipe.directions;

//parse through and add directions string
let directionsArray = directions.split(',.,');
console.log(directionsArray)
let currentStep = 0;
for (const direction of directionsArray) {
    let newStep = document.createElement('div');
    newStep.className = "mb-3 my-1 mx-3";

    let newStepLabel = document.createElement('label');
    newStepLabel.className = 'form-label';
    currentStep += 1;
    newStepLabel.innerHTML = 'Step ' + currentStep;

    let newStepText = document.createElement('textarea');
    newStepText.className = "form-control";
    newStepText.rows = 3;
    newStepText.readOnly = true;
    newStepText.value = direction;

    newStep.append(newStepLabel);
    newStep.append(newStepText);
    document.getElementById('directions').append(newStep);
}

document.getElementById('favoritesButton').addEventListener('click', e => {

    fetch('/api/users/favorites/' + currentUser.id)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("ERROR FETCHING API DATA");
            }
        }).then(favoritesObject => {
            let favoritesString = favoritesObject.favorites;
            let favoritesArray = favoritesObject.favorites.split(',.,');
            console.log(favoritesArray);
            if (favoritesArray.indexOf(viewRecipe.recipeId.toString()) == -1) {
                favoritesString += ',.,' + viewRecipe.recipeId;
                const jsonObject = { favorites: favoritesString }
                console.log(jsonObject);
                fetch('/api/users/favorites/' + currentUser.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jsonObject),
                }).then(res => {
                    console.log(res);
                })
            } else {
                //pass
            }

        })
        .catch((error) => console.error("FETCH ERROR:", error));

})


fetch('/api/users/favorites/' + currentUser.id)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("ERROR FETCHING API DATA");
        }
    }).then(favoritesObject => {
        let favoritesString = favoritesObject.favorites;
        let favoritesArray = favoritesObject.favorites.split(',.,');
        console.log(favoritesArray);
        if (favoritesArray.indexOf(viewRecipe.recipeId.toString()) > -1) {
            console.log('hi');
            document.getElementById('favoritesButton').hidden = true;
        } else {
            //pass
        }

    })
    .catch((error) => console.error("FETCH ERROR:", error));
//Remove add to favorites if already favorited
let favoritesString = currentUser.favorites;
let favoritesArray = favoritesString.split(',.,');
console.log(favoritesArray);

if (favoritesArray.indexOf(viewRecipe.recipeId.toString) > -1) {
    console.log('hi');
    document.getElementById('favoritesButton').hidden = true;
}