var _ = require("lodash");
var express = require("express");
const multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var book = require('./model');

var router = express.Router();
module.exports = router;



// api for adding a new book
router.post('/book/addBook',upload.single('documentPath') ,function(req, res) {
    
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
router.get('/book/allBooks', (req, res)=>{
    book.find({}, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});


//api for the rename of tag of books by use of _id feild
router.get("/book/edit/:id", (req, res) => {
    book.findOne({_id: req.params.id}, (err, book) => {
        if(err) throw err;
        res.render("edit", {
            title: "Edit Page",
            book: book
        });
    });
});


//api for the data to be updated by use of _id feild
router.post("/book/update/:id", upload.single('documentPath'), (req, res) => {
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
router.get("/book/delete/:id", (req, res) => {
    book.remove({_id: req.params.id}, (err) => {
        if(err) throw err;
       // console.log();
        res.send("Delete successful for "+req.params.id);
    });
});

//api for search via name of book
router.get("/book/search/name=:id", (req, res) => {
    book.find({name: req.params.id}).exec( (err, book) => {
        res.send(book);
    });
});

//api for search via isbn no.
router.get("/book/search/isbn=:id", (req, res) => {
    book.find({isbn: req.params.id}).exec( (err, book) => {
        res.send(book);
    });
});

//api for search via author anme
router.get("/book/search/authName=:id", (req, res) => {
    book.find({authName: req.params.id}).exec( (err, book) => {
        res.send(book);
    });
});
