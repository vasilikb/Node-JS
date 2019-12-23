const express = require("express");
let app = new express();

//When get is called on root, this function is called.
app.get("/", function(req, res){
    res.send("Hello, from node sample");
});

app.get("/about", function(req, res){
    res.send("About this web page.");
});

app.get("/contact", function(req, res){
    res.send("Contact us.");
});

app.get("*", function(req, res){
    res.send("You're Lost Dummy");
});

//If doesn't fall in any category above
app.all("*", function(req, res){
    res.send("What're you trying to do?")
});

let port = 12345;
app.listen(port, function(req, res){
    console.log("Server Started Listening at localhost:" + port);
});