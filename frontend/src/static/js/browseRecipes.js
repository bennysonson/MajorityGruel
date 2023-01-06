/**
 * Get recipes from api
 */
fetch('/api/recipes')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("ERROR FETCHING API DATA");
    }
  })
  .then(data => {
    // console.log(data);
    fillRecipesHTML(data)
  })
  .catch((error) => console.error("FETCH ERROR:", error));

/**
 * Create all recipes HTML and add them to the webpage.
 */
function fillRecipesHTML(recipes) {
  const recipeList = document.getElementById('recipes-list');
  recipes.forEach(recipe => {
    recipeList.append(createRecipeHTML(recipe));
  });
}

/**
 * Create recipe HTML.
 */
function createRecipeHTML(recipe) {
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

  const description = document.createElement('p');
  description.innerHTML = recipe.description;
  // const img = document.createElement('img');
  // img.src = `./data/users.json'${recipe.imageSource}`;
  // body2.appendChild(img);
  body2.appendChild(description);
  // LITERALLY WHATEVER WE WANT (rn just description and image)
  body.appendChild(body2);

  item.appendChild(body);

  return item;
}