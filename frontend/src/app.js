const express = require('express');
/* const multer = require('multer');
const path = require("path"); */

const app = express();
const PORT = process.env.PORT;

// Designate the static folder as serving static resources
app.use(express.static(__dirname + '/static'));
const html_path = __dirname + '/templates/'

// test error
app.get('/error', (req, res) => {
    res.json({ test: 'ERROR' });
});

app.get('/browseRecipes', (req, res) => {
    res.sendFile(html_path + '/browseRecipes.html')
});

app.get('/favorites', (req, res) => {
    res.sendFile(html_path + '/favorites.html')
});

app.get('/', (req, res) => {
    res.sendFile(html_path + '/home.html')
});

app.get('/addRecipe', (req, res) => {
    res.sendFile(html_path + '/addRecipe.html')
});

app.get('/login', (req, res) => {
    res.sendFile(html_path + '/login.html')
});

/* // THIS PAGE WILL BE CUT?
app.get('/start', (req, res) => {
    res.sendFile(html_path + '/startDecision.html')
}); */

app.get('/decide', (req, res) => {
    res.sendFile(html_path + '/decisionRecipeSelect.html')
});

app.get('/takequiz', (req, res) => {
    res.sendFile(html_path + '/quiz.html')
});

app.get('/profile', (req, res) => {
    res.sendFile(html_path + '/profile.html')
});

app.get('/recipe', (req, res) => {
    res.sendFile(html_path + '/recipe.html');
});

app.get('/quizResults', (req, res) => {
    res.sendFile(html_path + '/quizResults.html');
});

app.get('/recipeQuizView', (req, res) => {
    res.sendFile(html_path + '/recipeQuizView.html');
});

app.get('/register', (req, res) => {
    res.sendFile(html_path + '/register.html');
});

app.get('/offline', (req,  res) => {
  res.sendFile(html_path + `/offline.html`);
});

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

/* app.get("/", express.static(path.join(__dirname, "/static/img")));

const upload = multer({
    dest: "/path/to/temporary/directory/to/store/uploaded/files"
});

app.post(
    "/upload",
    upload.single("file"),
    (req, res) => {
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "/static/img/image.png");

        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(200)
                    .contentType("text/plain")
                    .end("File uploaded!");
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(403)
                    .contentType("text/plain")
                    .end("Only .png files are allowed!");
            });
        }
    }
);

app.get("/image.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/img/image.png"));
  }); */