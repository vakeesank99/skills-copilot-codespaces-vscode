//create webserver
var express = require('express');
var router = express.Router();
var db = require('../db');

//get all comments
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM comments', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

//get comments by id
router.get('/:id', function(req, res, next) {
  db.query('SELECT * FROM comments WHERE id = ?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

//create new comment
router.post('/', function(req, res, next) {
  db.query('INSERT INTO comments (id, comment, user_id, post_id) VALUES (?, ?, ?, ?)', [req.body.id, req.body.comment, req.body.user_id, req.body.post_id], function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

//update comment
router.put('/:id', function(req, res, next) {
  db.query('UPDATE comments SET comment = ?, user_id = ?, post_id = ? WHERE id = ?', [req.body.comment, req.body.user_id, req.body.post_id, req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

//delete comment
router.delete('/:id', function(req, res, next) {
  db.query('DELETE FROM comments WHERE id = ?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

module.exports = router;
