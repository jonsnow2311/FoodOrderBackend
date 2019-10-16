const Joi = require('joi'); //for validation
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const config = require('config');
const {User , validateUser} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/' , async(req,res) => {
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ $or: [{ email: req.body.email},{phone: req.body.phone}]});
    if(user) return res.status(400).send('User already registered...');


    user = new User(_.pick(req.body , ['name' , 'email' , 'phone' , 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password , salt);
    await user.save();

    const token = 'signedUpSuccessfully';
    res.header('x-auth-token' , token).send(_.pick(user , ['_id' , 'name' , 'email']));

});

module.exports = router;