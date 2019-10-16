const Joi = require('joi'); //for validation
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const config = require('config');
const {User , validateUser} = require('../models/user');
const _ = require('lodash');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

//PROFILE OPTIONS ==========================
router.get('/:id' , async(req,res) => {
    const user = await User.findById(req.params.id).select(('-password'));
    if(!user) return res.status(400).send('Invalid ID...');

    res.send(user);
});


//LOGIN CHECKER MODULE =========================
router.post('/' , async(req , res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne( { email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password...');

    const validPassword = await bcrypt.compare(req.body.password , user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password...');

    

    res.send(_.pick(user , ['_id' , 'name' , 'email']));

});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req,schema);
}

module.exports = router;