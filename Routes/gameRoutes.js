const express = require('express')
const gambleController = require('../Controllers/gameController')
const { list, create_game, gamble } = gambleController

const router = express.Router()

//verify route
router.get('/list', list )
router.post('/create', create_game )
router.post('/gamble', gamble )

module.exports = router