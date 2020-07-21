var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
    id: String,
    name: String,
    number: String,
    follow: String,
    state: String,
    photo: String
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');