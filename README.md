# MajorityGruel

By: Benson Liu, Ramon Sanchez, Alexa Simeonsson

MajorityGruel is a meal deciding app which allows users to register and login, upload, view and browse recipes, favorite recipes, and take 'recipe quizzes'. Recipe quizzes lets users select recipes from their favorite recipes list, and dynamically creates a quiz based on the entered number of participants. Participants are asked to rate each recipe and the results are outputted as a sorted list of recipes from highest rated to lowest.

### Pages in our app
| Page      | Status    | Wireframe |
| --------- | --------- | --------- |
| Login     | 40%       |           |
| Profile   | 70% (just need to use api data)|           |
| Create New User| 0%   |              |
| Home      | 100% |[Wireframe](https://github.com/bennysonson/MajorityGruel/blob/master/Wireframes/MDAFlow1.png)|
| Add Recipe| 90% (Need Image support)|[Wireframe](https://github.com/bennysonson/MajorityGruel/blob/master/Wireframes/MDAFlow1.png)|
|Browse Recipes| 90% (Need Image support)|[Wireframe](https://github.com/bennysonson/MajorityGruel/blob/master/Wireframes/MDAFlow2%263.png)|
|Favorite Recipes| 50% (just browse recipes page but filtered) |[Wireframe](https://github.com/bennysonson/MajorityGruel/blob/master/Wireframes/MDAFlow2%263.png)|
|Recipe| 90% (need image support)|[Wireframe](https://github.com/bennysonson/MajorityGruel/blob/master/Wireframes/MDAFlow4a.png)|
|New Quiz Form| 100% |[Wireframe](https://github.com/bennysonson/MajorityGruel/blob/master/Wireframes/MDAFlow4a.png)|
|Take Quiz Form| 100% |[Wireframe](https://github.com/bennysonson/MajorityGruel/blob/master/Wireframes/MDAFlow4a.png)|


### API endpoints
| Method    | Route     | Description |
| --------- | --------- | --------- |
| POST	    | /users	| Create a new user object (Registration)| 
| GET	    | /users	| Retrieves an array of all active users in the system| 
| GET	    | /users/:userId	| Retrieves a user by its ID| 
| POST      | /users/favorites/:userId | Posts a new favorite recipe for a user |
| GET       | /users/favorites/:userId | Retrieves a users favorite recipes |
| DELETE    | /users/favorites/:userId | Removes a recipe from a users favorites |
| POST	    | /recipes	| Add a recipe | 
| GET	    | /recipes	| Retrieves an array of all recipes in the system| 
| GET	    | /recipes/:recipeId | Retrieves a recipe by its ID|
| DELETE    | /recipes/:recipeId | Deletes a recipe by its ID |
| PUT       | /recipes/:recipeId | Updates a recipe by its ID |

## Updates Design
Revised design below (removed features are ~~struck out~~, added details are **bold**):

General
- General/universal/shared “cookbook.” All recipes are stored here.
- There is a login, each User creates an account profile in order to use the app.
- Users have a “favorite recipes list” where they can save/specify a smaller list of recipes they like or want to try.
- Recipes have listed ingredients, cooking time, difficulty, devices needed/recommended
    - Recipe pages have a link to add that recipe to users favorites list
- Kitchen owner/initiator: the person organizing a “decision quiz”

Initiator/kitchen owner user needs to do/have before you can use the app to make a decision
- User’s “favorites recipes list” must contain all the recipes they want to choose from
- At any time, they can upload a new recipe or browse the “general cookbook” to add more to their “favorite recipes list.”

When you are about to start a “decision quiz” thing
- Kitchen owner selects a subset of recipes from their favorites list
- Everyone part of the decision takes the quiz
    - ~~A one-time passcode is generated and the kitchen owner distributes it to all participants~~
    - All participants are given the list of recipes, and give it a “yes” or a “no”
        - instead of a new page per recipe, its a scrollable list. i.e. the quiz is one page.
- **At the end of each quiz, theres an option to "Generate Results" or "Another Quiz"**
    - **Let each participant take the quiz**
    - **After the final person is done click "Generate Results"**
- Results are outputted. They are sorted based on which ones received the highest rating on the quiz
    - Maybe results can be sorted by difficulty/time
- When you choose one to cook, the whole recipe shows up ~~for each device~~


