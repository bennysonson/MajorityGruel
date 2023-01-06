//GET user we're viewing's favorite recipes
let currentUser = JSON.parse(localStorage.getItem('user'));

fetch('/api/users/favorites/' + currentUser.id)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("ERROR FETCHING API DATA");
        }
    })
    .then(favoritesObject => {
        console.log(favoritesObject);
        let favoritesArray = favoritesObject.favorites.split(',.,');
        for (const favorite of favoritesArray) {
            if (favorite == "" || favorite == undefined) {
                continue;
            }
            fetch('/api/recipes/' + favorite)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("ERROR FETCHING API DATA");
                    }
                })
                .then(recipe => {
                    createRecipeHTML(recipe);
                })
        }

    })
    .catch((error) => console.error("FETCH ERROR:", error));

/**
* Create recipe HTML.
*/
function createRecipeHTML(recipe) {
    const recipeList = document.getElementById('recipes-list');
    const item = document.createElement('div');
    item.className = "accordion-item";
    item.classList.add('recipe');
    //   i think well want to add this back when we can link to a recipe page
    //   item.href = '/recipe?id=' + recipe.id;

    const namehead = document.createElement('h2');
    namehead.className = "accordion-header";
    namehead.id = `heading${recipe.recipeId}`;

    const name = document.createElement('button');
    name.setAttribute('data-bs-toggle', 'collapse');
    name.setAttribute('data-bs-target', `#collapse${recipe.recipeId}`);
    name.setAttribute('aria-expanded', 'false');
    name.setAttribute('aria-controls', `#collapse${recipe.recipeId}`);
    name.className = "accordion-button collapsed";
    name.innerHTML = recipe.name;
    namehead.appendChild(name);

    item.appendChild(namehead);


    const body = document.createElement('div');
    body.id = `collapse${recipe.recipeId}`;
    body.className = "accordion-collapse collapse";
    body.setAttribute('aria-labelledby', `heading${recipe.recipeId}`);
    body.setAttribute('data-bs-parent', '#recipes-list');

    const body2 = document.createElement('div');
    body2.className = "accordion-body";

    let newRecipeButton = document.createElement('button');
    newRecipeButton.type = "button";
    newRecipeButton.className = "btn btn-primary btn-sm float-end";
    newRecipeButton.innerHTML = 'View Recipe';
    newRecipeButton.addEventListener('click', e => {
        localStorage.setItem('viewRecipe', JSON.stringify(recipe));
        window.location = '/recipe';
    });
    body2.append(newRecipeButton);

    let removeRecipeButton = document.createElement('button');
    removeRecipeButton.type = "button";
    removeRecipeButton.className = "mx-1 btn btn-danger btn-sm float-end";
    removeRecipeButton.innerHTML = 'Remove Favorite';
    removeRecipeButton.addEventListener('click', e => {
        fetch('/api/users/favorites/' + currentUser.id)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("ERROR FETCHING API DATA");
                }
            }).then(favoritesObject => {
                let favoritesArray = favoritesObject.favorites.split(',.,');
                favoritesArray.splice(favoritesArray.indexOf(recipe.recipeId.toString()), 1);
                console.log(favoritesArray)
                let favoritesString;
                for (let i = 0; i < favoritesArray.length; i++) {
                    favoritesString += favoritesArray[i] + ',.,';
                }
                const jsonObject = { favorites: favoritesString }
                console.log(jsonObject)
                fetch('/api/users/favorites/' + currentUser.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jsonObject),
                }).then(res => {
                    console.log(res);
                    window.location = '/favorites'
                })
            })
            .catch((error) => console.error("FETCH ERROR:", error));
    });
    body2.append(removeRecipeButton);

    const description = document.createElement('p');
    description.innerHTML = recipe.description;
    // const img = document.createElement('img');
    // img.src = `./data/users.json'${recipe.imageSource}`;
    // body2.appendChild(img);
    body2.appendChild(description);
    // LITERALLY WHATEVER WE WANT (rn just description and image)
    body.appendChild(body2);

    item.appendChild(body);

    recipeList.append(item);
}