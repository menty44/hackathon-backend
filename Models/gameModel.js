module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define( "game", {
        winningcode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        win: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {timestamps: true}, )
    return Game
}