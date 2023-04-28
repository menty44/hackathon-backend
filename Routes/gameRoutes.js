const express = require('express')
const gambleController = require('../Controllers/gameController')
const { list, gamble } = gambleController

const router = express.Router()

//verify route
router.get('/list', list )
router.post('/gamble', gamble )

module.exports = router