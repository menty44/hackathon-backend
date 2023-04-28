const express = require("express");
const db = require("../Models");
//Assigning db.users to User variable
const User = db.users;

//Function to check if phone or email already exist in the database
//this is to avoid having two users with the same phone and email
const saveUser = async (req, res, next) => {
    //search the database to see if user exist
    try {
        const phone = await User.findOne({
            where: {
                phone: req.body.phone,
            },
        });
        //if phone exist in the database respond with a status of 409
        if (phone) {
            return res.json(409).send("phone already taken");
        }

        //checking if email already exist
        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        //if email exist in the database respond with a status of 409
        if (emailcheck) {
            return res.json(409).send("Authentication failed");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

//exporting module
module.exports = {
    saveUser,
};