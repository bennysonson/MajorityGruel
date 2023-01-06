let numbParticipants = JSON.parse(localStorage.getItem('numbParticipants'));
let recipeIds = JSON.parse(localStorage.getItem('selectedRecipeQuizIds'));

let recipeYes = [];
//let recipeNo = [];
let selectedRecipeList = [];

/* //display selected recipes for quiz
   //recipe/:recipeId endpoint does not work?
for (const recipeId of recipeIds) {
    fetch('/api/recipes/:' + recipeId)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("ERROR FETCHING API DATA");
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch((error) => console.error("FETCH ERROR:", error));
} */

//For now fetch all recipes then parse through
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

        //Add section for each participant
        for (let i = 0; i < numbParticipants; i++) {
            let newParticipant = document.createElement('div');
            newParticipant.className = "mb-3 my-5 mx-3";

            let newParticipantLabel = document.createElement('div');
            newParticipantLabel.className = "d-flex align-items-center justify-content-center";
            let newParticipantLabelText = document.createElement('h2');
            newParticipantLabelText.innerHTML = "Participant " + (i + 1);
            newParticipantLabel.append(newParticipantLabelText);
            newParticipant.append(newParticipantLabel);

            for (let recipe of selectedRecipeList) {
                let newRecipeLabel = document.createElement('div');
                newRecipeLabel.className = "mb-3 my-3 mx-3 d-flex align-items-center justify-content-center";
                let newRecipeLabelText = document.createElement('h5');
                newRecipeLabelText.innerHTML = recipe.name;
                newRecipeLabel.append(newRecipeLabelText);
                newParticipant.append(newRecipeLabel);

                let newRecipeCardContainer = document.createElement('div');
                newRecipeCardContainer.className = "d-flex align-items-center justify-content-center";
                let newRecipeCard = document.createElement('div');
                newRecipeCard.className = "card";
                let newRecipeCardImg = document.createElement('img');
                newRecipeCardImg.src = "./img/mealPlaceHolder.png";
                newRecipeCardImg.className = "card-img-top";
                newRecipeCardImg.alt = "recipe picture";
                let newRecipeCardBody = document.createElement('div');
                let newRecipeCardBodyDetails = document.createElement('div');

                //Fill out recipe details
                let recipeDescription = document.createElement('div');
                recipeDescription.innerHTML = recipe.description;
                recipeDescription.className = "d-flex align-items-center justify-content-center";
                newRecipeCardBodyDetails.append(recipeDescription);

                let recipeDifficulty = document.createElement('div');
                recipeDifficulty.className = "my-3 d-flex align-items-center justify-content-center";
                recipeDifficulty.innerHTML = 'Difficulty: ' + recipe.difficulty + '/3';

                let recipeDuration = document.createElement('div');
                recipeDuration.className = "my-3 d-flex align-items-center justify-content-center";
                recipeDuration.innerHTML = "Duration: " + recipe.hours + ' hours ' + recipe.minutes + ' minutes'

                //stars difficulty
                /* let recipeDifficulty = document.createElement('div');
                recipeDifficulty.className = "d-flex align-items-center justify-content-center";
                let star5Input = document.createElement('input');
                star5Input.className = 'star star-5';
                star5Input.id = 'star-5';
                star5Input.type = 'radio';
                let star5Label = document.createElement('label');
                star5Label.className = 'star star-5';
                star5Label.htmlFor = 'star-5';
                let star4Input = document.createElement('input');
                star4Input.className = 'star star-4';
                star4Input.id = 'star-4';
                star4Input.type = 'radio';
                let star4Label = document.createElement('label');
                star4Label.className = 'star star-4';
                star4Label.htmlFor = 'star-4';
                let star3Input = document.createElement('input');
                star3Input.className = 'star star-3';
                star3Input.id = 'star-3';
                star5Input.type = 'radio';
                let star3Label = document.createElement('label');
                star3Label.className = 'star star-3';
                star3Label.htmlFor = 'star-3';
                let star2Input = document.createElement('input');
                star2Input.className = 'star star-2';
                star2Input.id = 'star-2';
                star2Input.type = 'radio';
                let star2Label = document.createElement('label');
                star2Label.className = 'star star-2';
                star2Label.htmlFor = 'star-2';
                let star1Input = document.createElement('input');
                star1Input.className = 'star star-1';
                star1Input.id = 'star-1';
                star1Input.type = 'radio';
                let star1Label = document.createElement('label');
                star1Label.className = 'star star-1';
                star1Label.htmlFor = 'star-1';
                recipeDifficulty.append(star5Input);
                recipeDifficulty.append(star5Label);
                recipeDifficulty.append(star4Input);
                recipeDifficulty.append(star4Label);
                recipeDifficulty.append(star3Input);
                recipeDifficulty.append(star3Label);
                recipeDifficulty.append(star2Input);
                recipeDifficulty.append(star2Label);
                recipeDifficulty.append(star1Input);
                recipeDifficulty.append(star1Label); */

                newRecipeCardBodyDetails.append(recipeDifficulty);
                newRecipeCardBodyDetails.append(recipeDuration);

                let newRecipeCheckboxes = document.createElement('form');
                newRecipeCheckboxes.className = "text-center mb-3 my-3 mx-3";
                let newRecipeCheckboxYes = document.createElement('input');
                newRecipeCheckboxYes.type = 'radio';
                newRecipeCheckboxYes.className = "form-check-input mb-3 mx-2";
                newRecipeCheckboxYes.name = "checkboxes";
                newRecipeCheckboxYes.id = recipe.recipeId + ',.,' + (i + 1);
                recipeYes.push(newRecipeCheckboxYes.id);
                let newRecipeCheckboxYesLabel = document.createElement('label');
                newRecipeCheckboxYesLabel.innerHTML = 'Yes';
                let newRecipeCheckboxNo = document.createElement('input');
                newRecipeCheckboxNo.type = 'radio';
                newRecipeCheckboxNo.className = "form-check-input mb-3 mx-2";
                newRecipeCheckboxNo.name = "checkboxes";
                //newRecipeCheckboxNo.id = recipe.name + 'numb' + (i + 1);
                //recipeNo.push(newRecipeCheckboxNo.id);
                let newRecipeCheckboxNoLabel = document.createElement('label');
                newRecipeCheckboxNoLabel.innerHTML = 'No';
                newRecipeCheckboxes.append(newRecipeCheckboxYes);
                newRecipeCheckboxes.append(newRecipeCheckboxYesLabel);
                newRecipeCheckboxes.append(newRecipeCheckboxNo);
                newRecipeCheckboxes.append(newRecipeCheckboxNoLabel);

                newRecipeCardBody.append(newRecipeCardBodyDetails);
                newRecipeCard.append(newRecipeCardImg);
                newRecipeCard.append(newRecipeCardBody);
                newRecipeCardContainer.append(newRecipeCard);
                newParticipant.append(newRecipeCardContainer);
                newParticipant.append(newRecipeCheckboxes);
            }

            document.getElementById('participants').append(newParticipant);
        }

    })
    .catch((error) => console.error("FETCH ERROR:", error));

document.getElementById('submit').addEventListener('click', e => {

    //Talley up results
    let approveMap = new Map();
    for (let recipe of recipeYes) {
        if (document.getElementById(recipe).checked) {
            const recipeSplit = recipe.split(',.,');
            if (approveMap.has(recipeSplit[0])) {
                approveMap.set(recipeSplit[0], approveMap.get(recipeSplit[0]) + 1);
            } else {
                approveMap.set(recipeSplit[0], 1);
            }
        }
    }

    let obj = Object.fromEntries(approveMap);
    localStorage.setItem('recipeRatings', JSON.stringify(obj));
    window.location = '/quizResults';
})