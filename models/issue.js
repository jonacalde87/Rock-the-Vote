const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  datecreated: {
    type: Date, 
    default: Date.now,
  },
  upVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  downVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Issue', issueSchema);