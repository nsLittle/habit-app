const mongoose = require('mongoose');
const { isURL } = require('validator');

const TeamMemberSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: false, trim: true },
    lastName: { type: String, required: false, trim: true },
    email: { type: String, required: false, unique: false, match: /.+@.+\..+/ }, // Optional, but validates email format
    profilePic: {
      type: String,
      required: false,
      validate: {
        validator: isURL,
        message: props => `${props.value} is not a valid URL`
      }
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    habit: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
    role: { 
      type: String, 
      required: true, 
      enum: ['cohort', 'leader'], 
      default: 'cohort'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamMember', TeamMemberSchema);