let recipeInputIds = []

//Get Favorite recipes to display
//For now we'll just get all recipes in the system
fetch('/api/recipes')
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("ERROR FETCHING API DATA");
        }
    })
    .then(recipes => {
        //dynamically create recipe list
        for (const recipe of recipes) {
            let newRecipe = document.createElement('div');
            newRecipe.className = 'd-flex align-items-center justify-content-center';
            let newRecipeForm = document.createElement('div');
            newRecipeForm.className = 'form-check';
            newRecipe.append(newRecipeForm);
            let newRecipeInput = document.createElement('input');
            newRecipeInput.className = 'form-check-input';
            newRecipeInput.type = 'checkbox';
            newRecipeInput.id = recipe.recipeId;
            recipeInputIds.push(newRecipeInput.id);
            newRecipeForm.append(newRecipeInput);
            let newRecipeLabel = document.createElement('label');
            newRecipeLabel.className = 'form-check-label';
            newRecipeLabel.innerHTML = recipe.name;
            newRecipeForm.append(newRecipeLabel);
            document.getElementById('recipeList').append(newRecipe);
        }
    })
    .catch((error) => console.error("FETCH ERROR:", error));

document.getElementById('startQuizButton').addEventListener('click', e => {
    if (document.getElementById('numbParticipants').value == "") {
        //pass
    } else {
        localStorage.setItem('numbParticipants', document.getElementById('numbParticipants').value);

        //find checked recipes
        let checkedRecipes = [];
        for (const recipeId of recipeInputIds) {
            if (document.getElementById(recipeId).checked) {
                checkedRecipes.push(recipeId);
            }
        }
        localStorage.setItem('selectedRecipeQuizIds', JSON.stringify(checkedRecipes));

        window.location = '/takequiz'
    }
})

document.getElementById('cancelButton').addEventListener('click', e => {
    window.location = '/';
})