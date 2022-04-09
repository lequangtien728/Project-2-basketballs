const Restaurant = require("../models/restaurant");


module.exports = {
    index,
    new: newRestaurant,
    create,
    show,
  };
  

function index(req, res) {
    console.log(req.user, '< - req.user')
    Restaurant.find({}, function (err, restaurants) {
        res.render("restaurants/index", {
          // <-  this refers to the view folder, to find the page we want to send
          // back to the client
          restaurants,
          title: "All Restaurants",
        });
    });
}
  
function newRestaurant(req, res) {
    res.render("restaurants/new", { title: "Add Restaurant" });
}

function create(req, res) {
    console.log('create req body:')
      // ONE WAY
      const restaurant = new Restaurant(req.body);
      
      restaurant.save(function (err) { // mongoose talking 
        //to mongodb and saying put this object in the movies collection in the database
        // one way to handle errors
        console.log(err, " this err");
        if (err) return res.redirect("/restaurants/new");
        console.log(restaurant);
        // for now, redirect right back to new.ejs
        res.redirect("/restaurants");
      });
}
function show (req,res){
      Restaurant.findById(req.params.id, function(err, restaurant){
          res.render("restaurants/show", {title: "Restaurant Detail", restaurant: restaurant})
      });
}