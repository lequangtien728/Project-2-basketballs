const Restaurant = require('../models/restaurant');

module.exports = {
    create,
    delete: deleteReview
}

function create(req, res) {
    // two things we need to know from the request?
    // req.params.id = id of the restaurant we want to tadd the review to
    // req.body - contents of the form, which is the review we want to add to the restaurant
    //
    // console.log(req.params.id)
    // res.send('hello im hitting the create route in the reviews change me later')
    // Find the restaurant from the database
    // Restaurant.findById is a mongoose Method
    Restaurant.findById(req.params.id, function (err, restaurantFromDB) {
      // add the review (req.body) to the restaurantFromDB
  
      // Add the user-centric info to req.body (the new review)
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      req.body.userAvatar = req.user.avatar;
  
      restaurantFromDB.reviews.push(req.body); // mutating a document
      // we have to tell mongodb we changed the document,
      restaurantFromDB.save(function (err) {
        console.log(restaurantFromDB);
        // then we want to respond to the client!
        // redirect them to a page, What page makes sense to redirect?
        res.redirect(`/restaurants/${restaurantFromDB._id}`);
      });
    });
  }

function deleteReview(req, res, next){
	// Find the restaurant with the review!
	Restaurant.findOne({'reviews._id': req.params.id}, function(err, restaurantDocument){
		// find the subdocument itself, find the review in the restaurantDocument, that has the same id as our req.params.id
		const review = restaurantDocument.reviews.id(req.params.id);
		// If the review wasn't made by the user redirect them back to the same page
		if(!review.user.equals(req.user._id)) return res.redirect(`/restaurants/${restaurantDocument._id}`);

		// remove the review
		// 1 way find the review then call remove method
		review.remove()
		// remove the review
		// restaurantDocument.reviews.remove(req.params.id)
		restaurantDocument.save(function(err){
			if(err) next(err); // next(err) passes it to the express generator err handler
			res.redirect(`/restaurants/${restaurantDocument._id}`)
		})
	})
}
