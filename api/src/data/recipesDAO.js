const db = require('./DBConnection');
const Recipe = require('./models/Recipe');

function createRecipe(recipe) {
    return db.query('INSERT INTO recipe (user_id, recipe_name, recipe_description, recipe_img, recipe_hours, recipe_minutes, recipe_difficulty, recipe_ingredients, recipe_directions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [recipe.userId, recipe.name, recipe.description, recipe.img, recipe.hours, recipe.minutes, recipe.difficulty, recipe.ingredients, recipe.directions]).then(({ results }) => {
            return getRecipeById(results.insertId);
        });
}

function getRecipes() {
    return db.query('SELECT * FROM recipe').then(({ results }) => {
        return results.map(recipe => new Recipe(recipe));;
    });
}

function getRecipeById(recipeId) {
    return db.query('SELECT * FROM recipe WHERE recipe_id=?', [recipeId]).then(({ results }) => {
        if (results[0])
            return new Recipe(results[0]);
    });
}

function deleteRecipeById(recipeId) {
    return db.query('DELETE FROM recipe WHERE recipe_id=?', [recipeId]).then(({ results }) => {
        return getRecipes();
    });
}

module.exports = {
    createRecipe: createRecipe,
    getRecipes: getRecipes,
    getRecipeById: getRecipeById,
    deleteRecipeById: deleteRecipeById
}