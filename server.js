//importing modules
const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db = require('./Models')
const corsOptions = require('./config/corsOptions');
const checkOrigins = require('./Middlewares/checkOrigins');
const userRoutes = require ('./Routes/userRoutes')
const codeRoutes = require ('./Routes/codeRoutes')
const gameRoutes = require ('./Routes/gameRoutes')
const cors = require('cors');


//setting up your port
const PORT = process.env.PORT || 8080

//assigning the variable app to express
const app = express()

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(checkOrigins);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync")
})

//routes for the user API
app.use('/api/users', userRoutes)
app.use('/api/code', codeRoutes)
app.use('/api/game', gameRoutes)

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))
