document.getElementById('addToCookbookButton').addEventListener('click', e => {
    let recipeName = document.getElementById('recipeName').value;
    let recipeDescription = document.getElementById('recipeDescription').value;
    // let recipePhoto = document.getElementById('newImage').src;
    let recipeDurationHours = document.getElementById('recipeDurationHours').value;
    let recipeDurationMins = document.getElementById('recipeDurationMins').value;
    let recipeDifficulty;
    if (document.getElementById('star-1').checked == true) {
        recipeDifficulty = 1;
    }
    if (document.getElementById('star-2').checked == true) {
        recipeDifficulty = 2;
    }
    if (document.getElementById('star-3').checked == true) {
        recipeDifficulty = 3;
    }
    // if (document.getElementById('star-4').checked == true) {
    //     recipeDifficulty = 4;
    // }
    // if (document.getElementById('star-5').checked == true) {
    //     recipeDifficulty = 5;
    // }

    let recipeIngredientListQuery = document.querySelectorAll('li');
    let recipeIngredientList = "";
    //Build ingredient List string for db
    for (var ingredient of recipeIngredientListQuery) {
        recipeIngredientList += ingredient.innerHTML + ",.,";
    }

    //remove last ,.,
    recipeIngredientList = recipeIngredientList.slice(0, -3);

    let recipeDirectionsList = "";
    //Build ingredient List string for db
    for (let i = 1; i <= currentStep; i++) {
        if (document.getElementById('directionstep' + i).value == "") {
            continue;
        }
        recipeDirectionsList += document.getElementById('directionstep' + i).value + ',.,';
    }

    //remove last ,.,
    recipeDirectionsList = recipeDirectionsList.slice(0, -3);

    fetch('/api/recipes', {
        method: 'POST',
        body: JSON.stringify({
            "userId": 2,
            "name": recipeName,
            "description": recipeDescription,
            "img": "",
            "hours": recipeDurationHours,
            "minutes": recipeDurationMins,
            "difficulty": recipeDifficulty,
            "ingredients": recipeIngredientList,
            "directions": recipeDirectionsList
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res => {
        res.json()
        document.location = "/";
    })
        .catch(error => console.log(error));
})

//Add to ingredient list button
//TODO delete ingredient button
document.getElementById('ingredientAddButton').addEventListener('click', e => {
    if (document.getElementById('ingredientAdd').value == '') {
        //pass
    } else {
        let newIngredient = document.createElement('li');
        newIngredient.className = 'list-group-item';
        newIngredient.innerHTML = document.getElementById('ingredientAdd').value;
        document.getElementById('ingredientList').append(newIngredient);
        document.getElementById('ingredientAdd').value = "";
    }
})

let currentStep = 1;

document.getElementById('directionsAddButton').addEventListener('click', e => {
    if (document.getElementById('directionstep' + currentStep).value == "") {
        //pass
    } else {
        let newStep = document.createElement('div');
        newStep.className = "mb-3 my-1 mx-3";

        let newStepLabel = document.createElement('label');
        newStepLabel.className = 'form-label';
        currentStep += 1;
        newStepLabel.innerHTML = 'Step ' + currentStep;

        let newStepText = document.createElement('textarea');
        newStepText.id = 'directionstep' + currentStep;
        newStepText.className = "form-control";
        newStepText.rows = 3;

        newStep.append(newStepLabel);
        newStep.append(newStepText);
        document.getElementById('directions').append(newStep);
    }
})

document.getElementById('directionsDeleteButton').addEventListener('click', e => {
    if (currentStep == 1) {
        //pass
    } else {
        let select = document.getElementById('directions');
        select.removeChild(select.lastChild);
        currentStep -= 1;
    }
})