var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
  firstname: {type:String, required:true},
  lastname: {type:String, required:true},
  address: {type:String}
});

var Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
