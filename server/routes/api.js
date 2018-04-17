const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const apiUtil = require('../utils').apiUtil;

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized Request!');
  }

  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
      return res.status(401).send('Unauthorized Request!');
  }

  let payload = jwt.verify(token, 'secretKey');
  if(!payload){
    return res.status(401).send('Unauthorized Request!');
  }

  req.userEmail = payload.subject;
  next();
};

router.get('/', (req, res) => {
  res.send('Hello From API Route!');
});

router.post('/createUser', (req, res) => {
  apiUtil.createUser(req.body)
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});

router.post('/login', (req, res) => {
  apiUtil.login(req.body)
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      return res.status(401).send(err);
    });
});

router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ];

  return res.status(200).send(events);
});

router.get('/specialEvents', verifyToken, (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ];

  return res.status(200).send(events);
});

module.exports = router;