const Novel = require('../models/novels');

// return all records
Novel.find({}, (err, items) => {
  if (err) return next(err);
  console.log(items.length);
  // other code here
});