# Final Project

Group I: Benson Liu, Ramon Sanchez, Alexa Simeonsson

## Project Information
Project title: **Meal Deciding App**

### What needs to get done?
- [x] Readme
- [ ] Part 1: Finished Core Features
- [ ] Part 2: Offline Functionality
- [ ] Part 3: Installability

### Pages in our app
| Page      | Status    | Wireframe |
| --------- | --------- | --------- |
| Login     | 40%       |           |
| Profile   | 70% (just need to use api data)|           |
| Create New User| 0%   |              |
| Home      | 100% |[Wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupI/blob/3e1479bf8a5dd6a9130f36c169a3155c72f46017/Proposal/Wireframes/MDAFlow1.pdf)|
| Add Recipe| 90% (Need Image support)|[Wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupI/blob/3e1479bf8a5dd6a9130f36c169a3155c72f46017/Proposal/Wireframes/MDAFlow1.pdf)|
|Browse Recipes| 90% (Need Image support)|[Wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupI/blob/3e1479bf8a5dd6a9130f36c169a3155c72f46017/Proposal/Wireframes/MDAFlow2&3.pdf)|
|Favorite Recipes| 50% (just browse recipes page but filtered) |[Wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupI/blob/3e1479bf8a5dd6a9130f36c169a3155c72f46017/Proposal/Wireframes/MDAFlow2&3.pdf)|
|Recipe| 90% (need image support)|[Wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupI/blob/3e1479bf8a5dd6a9130f36c169a3155c72f46017/Proposal/Wireframes/MDAFlow4a.pdf)|
|New Quiz Form| 100% |[Wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupI/blob/3e1479bf8a5dd6a9130f36c169a3155c72f46017/Proposal/Wireframes/MDAFlow4a.pdf)|
|Take Quiz Form| 100% |[Wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupI/blob/3e1479bf8a5dd6a9130f36c169a3155c72f46017/Proposal/Wireframes/MDAFlow4a.pdf)|


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

## Contributions
|Part       | Item      | Progress  |Contributer(s)|Notes   |
| --------- | --------- | --------- | --------- | --------- |
|1          |M2 repo setup| finished | Alexa     |           |
|2          |Add RDB    |in progress   |Benson      |Needs testing|
|2          |RDB TESTING    |COMPLETE|Benson and Alexa|we were missing "mysql" module!!|
|3          |Update API Endpoints | started  | Benson|        |
|4          |Profile Page| basically done  | Alexa|        |
|4          |Recipe Page| progress (template without api data is there) | Alexa|        |
|4          |Add Recipe Page| in progress | Benson | POST issues and some bugs |
|6          |Screencast |           |           |           |


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


