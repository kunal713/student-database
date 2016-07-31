var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Student Database	' });
});

router.get('/list', function(req, res, next){
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/mongosite';

	MongoClient.connect(url, function(err, db){
		if (err)
			console.log('Could not connect to server');
		else{
			console.log('Connection Established');
			
			var collection = db.collection('students');
			collection.find({}).toArray(function(err, result){
				if (err)
					res.send(err);
				else if (result.length){
					res.render('studentlist', {
						"studentlist" : result
					});
				}
				else
					res.send('No documents found');
				db.close();
			});
		}
	})
});

router.get('/newstudent', function(req, res){
	res.render('newstudent', {title: 'Add Student'});
});

router.post('/addstudent', function(req, res){
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/mongosite';

	MongoClient.connect(url, function(err, db){
		if (err)
			console.log('Error in Connection');
		else{
			console.log('Connected');
			var collection = db.collection('students');
			var student1 = {
				student:req.body.student,
				street:req.body.street,
				city:req.body.city,
				state:req.body.state,
				sex:req.body.sex,
				gpa:req.body.gpa
			};
			collection.insert([student1], function(err, result){
				if (err)
					console.log(err);
				else
					res.redirect('list');
				db.close();
			});
		}
	});
});

module.exports = router;