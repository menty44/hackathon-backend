const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");

// Assigning users to the variable User
const User = db.users;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
    try {
        const { phone, email, password } = req.body;
        const data = {
            phone,
            email,
            password: await bcrypt.hash(password, 10),
        };
        //saving the user
        const user = await User.create(data);

        //if user details is captured
        //generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            //send users details
            return res.status(201).send(user);
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};


//login authentication

const login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        //find a user by their email
        const user = await User.findOne({
            where: {
                phone: phone
            }

        });

        //if user email is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            //if password is the same
            //generate token with the user's id and the secretKey in the env file

            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                //if password matches wit the one in the database
                //go ahead and generate a cookie for the user
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                await send_otp(phone);
                //send user data
                return res.status(201).send(user);
            } else {
                return res.status(401).send({message: "Authentication failed"});
            }
        } else {
            return res.status(401).send({message: "Authentication failed"});
        }
    } catch (error) {
        console.log(error);
    }
};


const send_otp = async (phone) => {

    const credentials = {
        apiKey: process.env.apiKey,         // use your sandbox app API key for development in the test environment
        username: process.env.username,      // use 'sandbox' for development in the test environment
    };
    const Africastalking = require('africastalking')(credentials);

// Initialize a service e.g. SMS
    const sms = Africastalking.SMS

// Use the service
    const options = {
        to: [phone],
        message: "I'm a lumberjack and its ok, I work all night and sleep all day"
    }

// Send message and capture the response or error
    sms.send(options)
        .then( response => {
            console.log(response);
        })
        .catch( error => {
            console.log(error);
        });
}

module.exports = {
    signup,
    login,
};