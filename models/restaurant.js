const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {type: String, required: true},
  rating: {type: Number, min: 1, max: 5, default: 5},
  // Add the 3 new properties below
  user: {type: Schema.Types.ObjectId, ref: 'User'}, // referencing the user document
  userName: String, // we probably don't need to populate the user everytime, we can just store their username because thats the most common thing we'll display
  // with the review
  userAvatar: String
}, {
  timestamps: true
});

const courseSchema = new Schema({
  courseName:{type: String},
  price:{type: Number},
  recipes:{type:String},
})


const restaurantSchema = new Schema({
  restaurantName: {type: String,required: true},
  location: {type: String,},
  openHour: {type: String,},
  // courses: [courseSchema],
  reviews: [reviewSchema], //One restaurant has many reviews
});




module.exports = mongoose.model('Restaurant', restaurantSchema);