const express = require('express')
const router = express.Router()

const user = require('./user')
const student = require('./student')
const product = require('./product')


router.use('/user',user);
router.use('/student',student)
router.use('/product',product)

module.exports = router