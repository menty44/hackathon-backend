const db = require("../Models");

// Assigning users to the variable User
const Game = db.game;

//verify code
const list = async (req, res) => {

    const data = await Game.findAll({});

    return res.status(201).send(data);

}

const gamble = async (req, res) => {
//     const {phone} = req.body;
//
//     const credentials = {
//         apiKey: process.env.apiKey,         // use your sandbox app API key for development in the test environment
//         username: process.env.username,      // use 'sandbox' for development in the test environment
//     };
//     const Africastalking = require('africastalking')(credentials);
//
//     // Initialize a service e.g. SMS
//     const sms = Africastalking.SMS
//
//     const code = Math.floor(1000 + Math.random() * 9000);
//     console.log(code);
//
//
//     //saving the user
//     const data = await Code.create({
//         phone,
//         code,
//         used: false
//     });
//
//     if (data) {
//         console.log("code", JSON.stringify(data, null, 2));
//     }
// // Use the service
//     const options = {
//         to: [phone],
//         message: `Your Lotto OTP is: ${code}`
//     }
//
// // Send message and capture the response or error
//     sms.send(options)
//         .then( response => {
//             console.log(response);
//         })
//         .catch( error => {
//             console.log(error);
//         });
//     return res.status(201).send({message: "code resent"});

}

module.exports = {
    list,
    gamble
};