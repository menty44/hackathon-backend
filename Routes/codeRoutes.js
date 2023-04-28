const express = require('express')
const codeController = require('../Controllers/codeController')
const { verify } = codeController

const router = express.Router()

//verify route
router.post('/verify', verify )

module.exports = router