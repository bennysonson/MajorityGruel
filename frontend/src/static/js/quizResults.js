let approveMap = new Map(Object.entries(JSON.parse(localStorage.getItem('recipeRatings'))));
let recipeIds = JSON.parse(localStorage.getItem('selectedRecipeQuizIds'));
let numbParticipants = JSON.parse(localStorage.getItem('numbParticipants'));

const sortMap = new Map([...approveMap.entries()].sort((a, b) => b[1] - a[1]));

console.log(sortMap);

let selectedRecipeList = [];

fetch('/api/recipes')
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("ERROR FETCHING API DATA");
        }
    })
    .then(data => {
        for (let recipe of data) {
            if (recipeIds.indexOf(recipe.recipeId.toString()) > -1) {
                selectedRecipeList.push(recipe);
            }
        }

        console.log(selectedRecipeList);

        for (let mapEntry of sortMap) {
            console.log(mapEntry);
            let newRecipe = document.createElement('li');
            newRecipe.className = "list-group-item";
            let currentRecipe;
            for (const recipe of selectedRecipeList) {
                if (recipe.recipeId.toString() == mapEntry[0]) {
                    currentRecipe = recipe;
                }
            }
            newRecipe.innerHTML = currentRecipe.name + "<br>Approval: " + mapEntry[1] + '/' + numbParticipants;

            let newRecipeButton = document.createElement('button');
            newRecipeButton.type = "button";
            newRecipeButton.className = "btn btn-primary btn-sm float-end";
            newRecipeButton.innerHTML = 'View Recipe';
            newRecipeButton.addEventListener('click', e => {
                localStorage.setItem('viewRecipe', JSON.stringify(currentRecipe));
                window.location = '/recipeQuizView';
            });
            newRecipe.append(newRecipeButton);

            document.getElementById('quizResultsList').append(newRecipe);
        }

    })
    .catch((error) => console.error("FETCH ERROR:", error));