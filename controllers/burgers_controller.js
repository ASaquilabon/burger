var express = require ("express"); 
var router = express.Router(); 
var burger = require ("../models/burger.js");
//todo create router for the app
router.get("/", function(req, res) {
    burger.all(function(data){
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject); 
        res.render("index", hbsObject);
    });
});

router.post("/", function (req, res){
    burger.insertOne([
        "burger_name", "devoured"
    ],[
        req.body.burger_name, req.body.devoured
    ], function(){
        res.redirect("/");
    });
});

router.post("/:id", function(req, res){
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function() {
        res.redirect("/");
    });
});
module.exports = router; 