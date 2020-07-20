var mongoose = require('mongoose');  
var PhoneBookSchema = new mongoose.Schema({  
    id: String,
    name: String,
    number: String,
    photo: String,
});
mongoose.model('PhoneBook', PhoneBookSchema);
module.exports = mongoose.model('PhoneBook');