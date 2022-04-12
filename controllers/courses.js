const Restaurant = require("../models/restaurant");

module.exports = {
    create,
    // delete: deleteCourse
}

function create (req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        restaurant.courses.push(req.body);
        restaurant.save(function(err){
            console.log(restaurant);
            res.redirect(`/restaurants/${restaurant._id}`);
        });
    });
}
// function deleteCourse(req, res, next){
//     Restaurant.findOne({'courses._id': req.params.id}, function(err, restaurantDocument){
// 		// find the subdocument itself, find the review in the movieDocument, that has the same id as our req.params.id
// 		const course = restaurantDocument.courses.id(req.params.id);
// 		// If the review wasn't made by the user redirect them back to the same page
// 		if(!course.user.equals(req.user._id)) return res.redirect(`/restaurants/${restaurantDocument._id}`);

// 		// remove the review
// 		// 1 way find the review then call remove method
// 		course.remove()
// 		// remove the review
// 		// movieDocument.reviews.remove(req.params.id)
// 		restaurantDocument.save(function(err){
// 			if(err) next(err); // next(err) passes it to the express generator err handler
// 			res.redirect(`/restaurants/${restaurantDocument._id}`)
// 		})
//     })  
// }