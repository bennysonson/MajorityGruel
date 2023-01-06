module.exports = class {
    constructor(data) {
        this.recipeId = data.recipe_id;
        this.userId = data.user_id;
        this.name = data.recipe_name;
        this.description = data.recipe_description;
        this.img = data.recipe_img;
        this.hours = data.recipe_hours;
        this.minutes = data.recipe_minutes;
        this.difficulty = data.recipe_difficulty;
        this.ingredients = data.recipe_ingredients;
        this.directions = data.recipe_directions;
    }
};