const express = require('express');
const router = express.Router();
const sendResponse = require('./send-response');
const sound = require('../model/soundModel');
const schema = require('../model/schema');
const multer = require('multer');
const sounds = new sound();

/**
 * Multer for Storing sound files
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './sounds');
  },
  filename: (req, file, cb) => {
    let filetype = '';
    if (file.mimetype === 'audio/mp3') {
      filetype = 'mp3';
    } else if (file.mimetype === 'audio/mp4') {
      filetype = 'mp4';
    }
    cb(null, 'sound-' + Date.now() + '.' + filetype);
  },
});

const upload = multer({
  storage: storage,
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  sendResponse(res, [], 'Sounds Route', false);
});

// Route to get all sounds data from database
router.get('/getSoundList', function(req, res, next) {
  sounds
    .getSoundList(req.query.userid)
    .then(response => {
      console.log('response', response);
      sendResponse(res, response, 'Sound data', false);
    })
    .catch(err => {
      sendResponse(res, [], 'Response Error', true);
    });
});

// Route to get all sounds data from database
router.get('/getUserSounds', function(req, res, next) {
  sounds
    .getUserSounds(req.query.userid)
    .then(response => {
      console.log('response', response);
      sendResponse(res, response, 'Sound data', false);
    })
    .catch(err => {
      sendResponse(res, [], 'Response Error', true);
    });
});

// Route to search particular song in sound list
router.post('/searchSoundList', function(req, res, next) {
  sounds
    .searchSoundList(req.body)
    .then(response => {
      console.log('response', response);
      sendResponse(res, response, 'Sound data', false);
    })
    .catch(err => {
      sendResponse(res, [], 'Response Error', true);
    });
});

// Route to insert a new sound in a datbase
router.post('/addNewSound', function(req, res, next) {
  console.log(req.body);
  sounds
    .addNewSound(req.body)
    .save()
    .then(response => {
      console.log('response', response);
      sendResponse(res, response, 'Sound data', false);
    })
    .catch(err => {
      sendResponse(res, [], 'Response Error', true);
    });
});

// Route to insert a new sound in a datbase
router.post('/uploadSound', upload.single('file'), function(req, res, next) {
  // console.log(req.body);
  console.log(req.file);
  const data = {
    filename: req.file.path,
  };
  sendResponse(res, data, 'File Uploaded Successfully', false);
});

module.exports = router;
