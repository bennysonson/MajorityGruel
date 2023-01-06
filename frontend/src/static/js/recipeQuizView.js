let viewRecipe = JSON.parse(localStorage.getItem('viewRecipe'));
let currentUser = JSON.parse(localStorage.getItem('user'));

console.log(viewRecipe);

//Fill page with recipe info
document.getElementById('recipeName').innerHTML = viewRecipe.name;

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
    newStepLabel.innerHTML = 'Step' + currentStep;

    let newStepText = document.createElement('textarea');
    newStepText.className = "form-control";
    newStepText.rows = 3;
    newStepText.readOnly = true;
    newStepText.value = direction;

    newStep.append(newStepLabel);
    newStep.append(newStepText);
    document.getElementById('directions').append(newStep);
}

document.getElementById('goBack').addEventListener('click', e => {
    window.location = '/quizResults';
})

document.getElementById('goHome').addEventListener('click', e => {
    window.location = '/';
})

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
        })
        .catch((error) => console.error("FETCH ERROR:", error));
})