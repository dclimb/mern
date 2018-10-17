const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
    handle: {
      type: String,
      require: true,
      max: 30
    },
    company:{
      type: String,
    },
    website: {
      type: String,
    },
    location:{
      type: String,
    },
    bio: {
      type: String
    },
    status:{
      type: String,
      require: true,
    },
    skills:{
      type: [String],
      require: true,
    },
    bio:{
      type: String,
    },
    github:{
      type: String,
    },
    experience: [
      {
        title: {
          type: String,
          require: true,
        },
        company: {
          type: String,
          require: true,
        },
        location: {
          type: String,
        },
        from:{
          type: Date,
          require: true,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default:false
        },
        description: {
          type: String,
        }
      }
    ],
    education: [
      {
        school: {
          type: String,
          require: true,
        },
        degree: {
          type: String,
          require: true,
        },
        fieldOfEducation: {
          type: String,
          required: true
        },
        from:{
          type: Date,
          require: true,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default:false
        },
        description: {
          type: String,
        }
      }
    ],
    social: [
      {
        youtube: {
          type: String
        },
        twiter: {
          type: String
        },
        facebook: {
          type: String
        },
        instagram: {
          type: String
        },
        linkedin: {
          type: String
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);
