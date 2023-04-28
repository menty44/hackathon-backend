module.exports = (sequelize, DataTypes) => {
    const Code = sequelize.define( "code", {
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true, //checks for email format
            allowNull: false
        },
        used: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {timestamps: true}, )
    return Code
}