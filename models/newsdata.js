var mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
  title: String,
  description:String,
  publishedAt:Date,
  author:String,
  createdDate: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('News', NewsSchema)