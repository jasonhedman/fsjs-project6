//Set up server
const express = require('express');
const data = require('./data.json');
const projects = data.projects;
const app = express();

//Set up middleware
app.set("view engine", "pug");
app.use("/static", express.static('public'));

//Set up routes

app.get('/', (req, res) => {
    res.render('index', data);
});

//Renders "about" page
app.get('/about', (req, res) => {
    res.render('about');
});

//Renders project pages with a given project id
app.get('/project:id', (req, res) => {
    const {id} = req.params;
    res.render('project', projects[id-1]);
});

//Creates an error if no route is found
app.use((req, res, next) => {
    const err = new Error('We are having trouble loading the content you are trying to access');
    err.status = 500;
    next(err);
});
 
//Renders error page using the err object from the previous middleware
app.use((err, req, res, next)=>{
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('This app is being run on port 3000');
});