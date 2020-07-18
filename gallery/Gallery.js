var mongoose = require('mongoose');  
var GallerySchema = new mongoose.Schema({  
    id: String,
    photoid: String,
    image: String,
    contents: String,
    like : Number
});
mongoose.model('Gallery', GallerySchema);
module.exports = mongoose.model('Gallery');