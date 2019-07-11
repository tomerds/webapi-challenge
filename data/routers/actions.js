const express = require("express");
const db = require('../helpers/actionModel');
const router = express.Router();

// custom middleware

function checkId(req, res, next) {

  if (req.body.project_id !== req.params.id) {
    console.log('hello')
    // res.status(400).json({
    //   message: `No project ID found for the action`
    // })
    next();
  }
  else {
    next();
  }
}

function checkObject(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes || req.body.completed) {
    res.status(400).json({ error: 'All fields are required' })
  }
  else if (req.body.description.length > 128) {
    res.status(400).json({ error: "Please make sure the description is less than 128 characters." })
  }
  else {
    next();
  }
}

router.get('/', (req, res) => {
  db.get()
    .then(array => {
      res.status(200).json(array);
    })
    .catch(err => {
      res.status(500).error({ error: 'Error fetching data' });
    })
});

router.get('/:id', checkId, (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(project => {
      if (project === null) {
        res.status(404).json({ error: 'User not found' })
      }
      else {
        res.status(200).json(project);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error fetching data' });
    })
})

router.post('/', checkObject, (req, res) => {
  db.insert(req.body)
    .then(actions => {
      res.status(201).json(actions)
    })
    .catch(err => {
      res.status(500).json({ error: 'Error fetching data' });
    })
})


router.put('/:id', checkId, (req, res) => {
  const id = req.params.id;
  db.update(id, req.body)
    .then(project => {
      if (project === null) {
        res.status(404).json({ error: 'User not found' })
      }
      else {
        res.status(200).json(project);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error fetching data' });
    })
})

router.delete('/:id', checkId, (req, res) => {
  const id = req.params.id;
  db.remove(id, req.body)
    .then(number => {
      if (number === 0) {
        res.status(404).json({ error: 'User not found, could not be deleted.' })
      }
      else {
        res.status(200).json(number);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error processing data' });
    })
})



module.exports = router;