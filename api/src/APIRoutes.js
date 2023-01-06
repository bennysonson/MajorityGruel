const express = require('express');
const apiRouter = express.Router();

const cookieParser = require('cookie-parser');
apiRouter.use(cookieParser());

//Include data files
let users = require('./data/usersDAO');
let recipes = require('./data/recipesDAO');
// CONSTS work with DB
const recipesDAO = require('./data/recipesDAO');
const usersDAO = require('./data/usersDAO');

const { TokenMiddleware, generateToken, removeToken } = require('./middleware/TokenMiddleware');

/************\
* API ROUTES *
\************/

apiRouter.use(express.json());



/* USER AUTHENTICATION ROUTES */

apiRouter.post('/users/login', (req, res) => {
  if (req.body.username && req.body.password) {
    usersDAO.getUserByCredentials(req.body.username, req.body.password).then(user => {
      let result = {
        user: user
      }

      generateToken(req, res, user);

      res.json(result);
    }).catch(err => {
      res.status(400).json({ error: err });
    });
  }
  else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

apiRouter.post('/users/logout', (req, res) => {
  removeToken(req, res);

  res.json({ success: true });
});


apiRouter.get('/users/current', TokenMiddleware, (req, res) => {
  res.json(req.user);
});





/* EVERYTHING ELSE */


//Post a new user given a user object (Registration)
// WORKS BUT DOES NOT RETURN STUFF
apiRouter.post('/users', (req, res) => {
  let newUser = req.body;
  newUser = usersDAO.createUser(newUser).then(user => {
    // res.json(user);
    res.json({ success: true });
  });
});

//Retrieves an array of all active users in the system
// WORKS
apiRouter.get('/users', (req, res) => {
  usersDAO.getAllUsers().then(users => {
    res.json(users);
  })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

//Retrieves a user by their ID
// WORKS
apiRouter.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  usersDAO.getUserById(userId).then(user => {
    if (user) {
      res.json(user);
    }
    else {
      res.status(404).json({ error: 'User not found' });
    }
  })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

//Updates a new favorite recipe for a user
// DOES NOT WORK YET???
apiRouter.put('/users/favorites/:userId', (req, res) => {
  const userId = req.params.userId;
  let favoriteInfo = req.body.favorites;
  favoriteInfo = usersDAO.updateFavoritesById(favoriteInfo, userId).then(favorites => {
    res.json(favorites);
  })
});


// DOES NOT WORK YET???

//Get favorite recipes by a given user
apiRouter.get('/users/favorites/:userId', (req, res) => {
  const userId = req.params.userId;
  usersDAO.getFavoritesById(userId).then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }).catch(err => {
    res.status(500).json({ error: err });
  });
});

//Delete a favorite recipe from a given user
apiRouter.delete('/users/favorites/:userId', (req, res) => {
  const userId = req.params.userId;
  let user = users.find(user => user.id == userId);

  //Remove recipeId from favorites list
  let index = user.favorites.indexOf(req.body.recipeId);
  user.favorites.splice(index, 1);
});

//Post a new recipe
// WORKS
apiRouter.post('/recipes', (req, res) => {
  let newRecipe = req.body;
  newRecipe = recipesDAO.createRecipe(newRecipe).then(recipe => {
    res.json(recipe);
  });
});

//Retrieve an array of all recipes
// WORKS
apiRouter.get('/recipes', (req, res) => {
  recipesDAO.getRecipes().then(recipes => {
    res.json(recipes);
  })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

//Retrieve a recipe by recipeId
// WORKS
apiRouter.get('/recipes/:recipeId', (req, res) => {
  const recipeId = req.params.recipeId;
  recipesDAO.getRecipeById(recipeId).then(recipe => {
    if (recipe) {
      res.json(recipe);
    }
    else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

//Delete a recipe by recipeId
// WORKS
apiRouter.delete('/recipes/:recipeId', (req, res) => {
  const recipeId = req.params.recipeId;
  recipesDAO.deleteRecipeById(recipeId).then(recipes => {
    res.json(recipes);
  }).catch(err => {
    res.status(400).json({ error: err });
  });
})



//Update a recipe by recipeId
// DOESNT WORK -- NOT UPDATED
apiRouter.put('/recipes/:recipeId', (req, res) => {
  const recipeId = req.params.recipeId;
  let newRecipe = req.body;
  let recipe = recipes.find(recipe => recipe.id == recipeId);
  if (recipe) {
    recipes[recipes.indexOf(recipe)] = newRecipe;
    res.json(newRecipe);
  } else {
    console.log("error updatingn recipe");
  }
})


module.exports = apiRouter;
