document.addEventListener("DOMContentLoaded", e => {
    document.getElementById('addRecipeButton').addEventListener('click', e => {
        isUserLoggedIn('/addRecipe');
    });

    document.getElementById('browseRecipesButton').addEventListener('click', e => {
        window.location = '/browseRecipes';
    });

    document.getElementById('viewFavoritesButton').addEventListener('click', e => {
//         window.location = '/favorites';
        isUserLoggedIn('/favorites');
    });

    document.getElementById('profilePic').addEventListener('click', e => {
        isUserLoggedIn('/profile');
    });

    document.getElementById('makeDecisionButton').addEventListener('click', e => {
        isUserLoggedIn('/decide');
    })
});

function isUserLoggedIn(page) {
    fetch('/api/users/current')
        .then((response) => {
            if (response.ok) {
                document.location = page;
            } else {
                document.location = '/login';
            }
        })
        .catch((error) => console.error("FETCH ERROR:", error));
}