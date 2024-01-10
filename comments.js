//create webserver

var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');
var User = require('../models/user');
var mongoose = require('mongoose');
var passport = require('passport');
var auth = require('../config/auth');

//get all comments
router.get('/', function(req, res) {
  Comment.find(function(err, comments) {
    if(err) {
      res.send(err);
    }
    res.json(comments);
  });
});

//add comment
router.post('/', auth.isAuthenticated, function(req, res) {
  var comment = new Comment();
  comment.text = req.body.text;
  comment.post = req.body.post;
  comment.user = req.user._id;
  comment.save(function(err, comment) {
    if(err) {
      res.send(err);
    }
    res.json(comment);
  });
});

//get comment by id
router.get('/:id', function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if(err) {
      res.send(err);
    }
    res.json(comment);
  });
});

//update comment
router.put('/:id', auth.isAuthenticated, function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if(err) {
      res.send(err);
    }
    comment.text = req.body.text;
    comment.post = req.body.post;
    comment.user = req.user._id;
    comment.save(function(err, comment) {
      if(err) {
        res.send(err);
      }
      res.json(comment);
    });
  });
});

//delete comment
router.delete('/:id', auth.isAuthenticated, function(req, res) {
  Comment.findByIdAndRemove(req.params.id, function(err, comment) {
    if(err) {
      res.send(err);
    }
    res.json(comment);
  });
});

module.exports = router;