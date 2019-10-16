const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10
  }
});

const User = mongoose.model('User' , userSchema);

function validateUser(user) {
  const Schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(10).max(10).required()
  }

  return Joi.validate(user , Schema);
}

exports.User = User;
exports.validateUser = validateUser;