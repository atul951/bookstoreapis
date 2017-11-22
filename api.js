var _ = require("lodash");
var express = require("express");
const multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var book = require('./model');

var router = express.Router();
module.exports = router;



// api for adding a new book
router.post('/book',upload.single('documentPath') ,function(req, res) {
    
    //Get form values
    var isbn = req.body.isbn && req.body.isbn.trim();
    var name = req.body.name && req.body.name.trim();
    var authName = req.body.authName && req.body.authName.trim();
    var date = req.body.date && req.body.date.trim();
    var price = req.body.price && req.body.price.trim();
    


    if(req.file){
        // If file successfully loaded
    	console.log("Uploading file");    
        var documentPath = req.file.destination+req.file.originalname;
    } else{
    	var documentPath = '/Nowhere/noDocument.pdf';
    }

    
    // add book object to  database
    var newBook = new book({
    	isbn: isbn,
    	name: name,
    	authName: authName,
    	date: date,
    	price: price,
    	documentPath: documentPath
    });
    // add function
    book.createBook(newBook, function(err, data){
    	if(err) throw err;
    	console.log(data);
        res.send(data);
    });
});


// api for getting all books
router.get('/book', (req, res)=>{
    book.find({}, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

//api for the data to be updated by use of _id feild
router.patch("/book/:id", upload.single('documentPath'), (req, res) => {
        //Get form values
    var isbn = req.body.isbn && req.body.isbn.trim();
    var name = req.body.name && req.body.name.trim();
    var authName = req.body.authName && req.body.authName.trim();
    var date = req.body.date && req.body.date.trim();
    var price = req.body.price && req.body.price.trim();
    


    if(req.file){
        // If file successfully loaded
        console.log("Uploading file");    
        var documentPath = req.file.destination+req.file.originalname;
    } else{
        var documentPath = '/Nowhere/noDocument.pdf';
    }

    
    book.update({_id: req.params.id}, { $set: {
        isbn: isbn,
        name: name,
        authName: authName,
        date: date,
        price: price,
        documentPath: documentPath
    } }, (err, data) => {
        if(err) throw err;
        console.log(data);
    });

    var result = {
        isbn: isbn,
        name: name,
        authName: authName,
        date: date,
        price: price,
        documentPath: documentPath
    };

    res.send(result);
        
});

//api for delete book { delete by _id }
router.delete("/book/:id", (req, res) => {
    book.remove({_id: req.params.id}, (err) => {
        if(err) throw err;
       // console.log();
        res.send("Delete successful for "+req.params.id);
    });
});

//api for search via name of book
router.get("/book/:id", (req, res) => {
    book.find({name: req.params.id}).exec( (err, book) => {
        res.send(book);
    });
});
