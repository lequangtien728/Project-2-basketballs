const Restaurant = require("../models/restaurant");
const Course = require("../models/course");

module.exports = {
    new:newCourse,
    create,
    
}

function newCourse (req,res){
    res.render ('courses/new',{
        title: "Add Course",
        restaurantId: req.params.id
    })
}
async function create (req, res){
    await Restaurant.findById(req.params.id, function(err, restaurant){
        // req.body.restaurant = restaurant
        console.log(req.body)
        Course.create(req.body, function (err, course){
            restaurant.courses.push(course._id)
            restaurant.save()
            console.log(restaurant);
            res.redirect(`/restaurants/${req.params.id}`);
        })
    })
}
