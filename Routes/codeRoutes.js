const express = require('express')
const codeController = require('../Controllers/codeController')
const { verify, resend_code } = codeController

const router = express.Router()

//verify route
router.post('/verify', verify )
router.post('/resend_code', resend_code )

module.exports = router