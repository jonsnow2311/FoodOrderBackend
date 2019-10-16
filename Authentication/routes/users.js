const Joi = require('joi'); //for validation
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {User , validateUser} = require('../models/user');
const _ = require('lodash');

router.get('/' , async(req,res) => {
    const users = await User.find().select({name : 1});
    if(!users) return res.status(404).send('Users not found');

    res.send(users);
});

module.exports = router;