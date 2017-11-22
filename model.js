var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/booksDB',{ useMongoClient: true });

var db = mongoose.connection;

// Book Schema
var bookSchema = mongoose.Schema({
	isbn: String,
	name: String,
	authName: String,
	date: String,
	price: String,
	documentPath: {
		type: String,
		required: true,
		trim: true
	}
});



var book = module.exports = db.model('book',bookSchema);


module.exports.createBook = function(newBook , callback){
	newBook.save(callback);
}
