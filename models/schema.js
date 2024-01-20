const mongoose = require('mongoose');

const MovieModel = mongoose.model('Movie', {
  title: String,
  description: String,
  release_date: Date,
  genres: [String],
  cast: [String],
  crew: {
    director: String,
    producer: String,
    writer: String,
  },
  access_control: [Object]
});

const dataModel = mongoose.model('Example', schemaTest);
module.exports = dataModel