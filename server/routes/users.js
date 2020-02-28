var express = require('express');
var router = express.Router();
const sendResponse = require('./send-response');
const users = require('../model/usersModel');
const schema = require('../model/schema');
const user = new users();
/* GET users listing. */
router.get('/', function(req, res, next) {
  sendResponse(res, [], 'User Route', false);
});

// Route to create new user in the database
router.post('/createUser', function(req, res, next) {
  const data = req.body;
  // console.log('data', data);
  user
    .checkIfUserExists(data.email)
    .then(response => {
      // console.log('response', response);
      if (response.length === 0) {
        console.log('Create new user!');
        user
          .createUser(data)
          .save()
          .then(response => {
            console.log('response', response);
            sendResponse(res, response, 'User created successfully', false);
          });
      } else {
        console.log('User already exists!');
        console.log('response', response);
        sendResponse(res, response, 'User already exists!', false);
      }
      // sendResponse(res, response, 'User added successfully', false);
    })
    .catch(err => {
      sendResponse(res, [], 'Response Error', true);
    });
});

//Route to login the user
router.post('/loginUser', function(req, res, next) {
  const data = req.body;
  // console.log('data', data);
  user
    .loginUser(data)
    .then(response => {
      console.log('response', response);
      sendResponse(res, response, 'User data', false);
    })
    .catch(err => {
      sendResponse(res, [], 'Response Error', true);
    });
});

module.exports = router;
