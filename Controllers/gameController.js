const db = require("../Models");

// Assigning users to the variable User
const Game = db.game;

//verify code
const list = async (req, res) => {

    const data = await Game.findAll({});

    return res.status(201).send(data);

}

const create_game = async (req, res) => {

    const data = await Game.create(req.body);

    if (data) {
        return res.status(201).send(data);
    } else {
        return res.status(409).send("Error while creating game");
    }

}

const gamble = async (req, res) => {

    try {
        const {phone, code} = req.body;

        const credentials = {
            apiKey: process.env.apiKey,         // use your sandbox app API key for development in the test environment
            username: process.env.username,      // use 'sandbox' for development in the test environment
        };

        const Africastalking = require('africastalking')(credentials);

        //find a user by their email
        const winning = await Game.findOne({
            where: {
                winningcode: code
            }
        });

        if (winning.win === true) {
            const airtime = Africastalking.AIRTIME
            await airtime.send({
                recipients: [
                    {
                        phoneNumber: phone,
                        currencyCode: 'KES',
                        amount: 20
                    }
                ],
                maxNumRetry: 3, // Will retry the transaction every 60seconds for the next 3 hours.
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
            return res.status(201).send({message: "You won"});
        } else {
            return res.status(409).send({message: "You lost"});
        }
    } catch (error) {
        console.log(error);
    }


}

module.exports = {
    list,
    gamble,
    create_game
};