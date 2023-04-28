const db = require("../Models");

// Assigning users to the variable User
const Code = db.code;

//verify code
const verify = async (req, res) => {
    const {phone, code} = req.body;

    const data = await Code.findOne({
        where: {
            phone: phone,
            code: code,
        }

    });

    if (data.used === true) {
        return res.status(409).send({message: "code has already been used"});
    }

    if (data) {
        console.log("code", JSON.stringify(data, null, 2));

        Code.update(

            // Set Attribute values
            { used: true },

            // Where clause / criteria
            { where: { id : data.id }   }

        ).then(function(affectedRows) {
            console.log("affectedRows", affectedRows);
        }).catch(function(err) {
            console.log(err);
            return res.status(409).send({message: "code not verified"});
        });

        return res.status(201).send({message: "code verified"});
    } else {
        return res.status(409).send({message: "code not verified"});
    }

}

module.exports = {
    verify,
};