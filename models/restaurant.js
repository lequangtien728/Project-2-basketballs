const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const restaurantsSchema = new Schema({
  restaurantName: {type: String,required: true},
  location: {type: String,},
  openHour: {type: String,},
});

module.exports = mongoose.model('Restaurant', restaurantsSchema);