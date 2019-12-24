const express = require("express");
const Joi = require('joi');
let app = new express();

app.use(express.json()); //Middleware for express to use to parse JSON in req body

//With http
//const http = require("http")
//const server = http.createServer((req, res) =>{
//  if(req === '/'){
//      ... 
//  }
//})
// server.listen(3000) --- ctrl + c on command line

const cust = [
    {id: '1', name: 'Brad'},
    {id: '2', name: 'Fred'},
    {id: '3', name: 'Said'},
    {id: '4', name: 'Meat'},
];

app.get("/", function(req, res){
    res.send("Hello, from node samples");
});

app.get("/about", function(req, res){
    res.send("About this web page.");
});

app.get("/course/:id", (req, res) => {
    //res.send(cust[req.params.id - 1].name);
    const course = cust.find(c => c.id === req.params.id);
    if(!course) return res.status(404).send(`Course with given id not found`);
    res.send(course);//404 Not Found
});

app.put("/api/courses/:id", (req, res) => {
    //First check if record exists
    const course = cust.find(c => c.id === req.params.id);
    if(!course) return res.status(404).send(`Course with given id not found`);

    //Validate Records
    const schema = {
        name: Joi.string().min(3).required()
    };
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        
    course.name = req.body.name;
    res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
    //First check if record exists
    const course = cust.find(c => c.id === req.params.id);
    if(!course) return res.status(404).send(`Course with given id not found`);

    //Delete
    const index = cust.indexOf(course);
    cust.splice(index, 1);

    res.send(cust);
});

app.get("/about/:id", function(req, res){
    res.send(req.params.id);
    res.send(req.query); //Returns query parameters (i.e. q=)
});

app.get("*", function(req, res){
    res.send("You're Lost Dummy");
});

app.post('/api/courses', (req, res) => {
//    if(!req.body.name || req.body.name.length < 3) {
        //400 Bad Request
//        res.status(400).send("Name is required, should be 3 characters");
//        return;
//    }
//Joi implementation
    const schema = {
        name: Joi.string().min(3).required()
    };

    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course1 = {
        id : cust.length + 1,
        name : req.body.name
    };
    cust.push(course1);
    res.send(course1);
});

//If doesn't fall in any category above
app.all("*", function(req, res){
    res.send("What're you trying to do?")
});

//If port not defined in environment variable, assign 3000
const port = process.env.PORT || 3000;

app.listen(port, function(req, res){
    console.log(`Server Started Listening at localhost: ${port}`);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
};