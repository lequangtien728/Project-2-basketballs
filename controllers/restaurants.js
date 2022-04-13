const Course = require("../models/course");
const { populate } = require("../models/restaurant");
const Restaurant = require("../models/restaurant");


module.exports = {
    index,
    new: newRestaurant,
    create,
    show,
    edit,
    update,
  };
  

function index(req, res) {
    // console.log(req.user, '< - req.user')
    Restaurant.find({}, function (err, restaurantDoc) {
        res.render("restaurants/index", {//<- this refers to the view folder, to find the page we want to send back to the client
          restaurantDoc:restaurantDoc,
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
        //to mongodb and saying put this object in the restaurant collection in the database
        // one way to handle errors
        console.log(err, " this err");
        if (err) return res.redirect("/restaurants/new");
        console.log(restaurant);
        // for now, redirect right back to new.ejs
        res.redirect("/restaurants");
      });
}
function show (req,res){
      Restaurant.findById(req.params.id)
        .populate('courses')
        .exec(function(err,restaurantDoc1){
        // console.log(restaurant)
          res.render("restaurants/show", {title: "Restaurant Detail", restaurantDoc1: restaurantDoc1,})
        // })
      // });
        })
}

//create the edit function to Restaurant information.
function edit (req,res){
  Restaurant.findById(req.params.id, function(err,restaurantDoc2){
    res.render('restaurants/edit',{title: "Restaurant Edit", restaurantDoc2})
  })
}
//update new Restaurant information in database.
async function update (req,res){
  // console.log(req.body)
  const updated = await Restaurant.findByIdAndUpdate(req.params.id,req.body,{new:true});
  //add await for the code to completely ran without skip/promise to return.
  // console.log(updated)
  res.redirect(`/restaurants/${req.params.id}`)

}