const { validationResult } = require('express-validator')
const router = require('express').Router()

const adminAuth = require('../middleware/admin.middleware')

const { regKeyValidators } = require('../utils/validators')

const RegKey = require('../models/RegKey')

router.post('/', adminAuth, regKeyValidators, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }
    const regKey = await RegKey.create(req.body)
    return res
      .status(200)
      .json({ message: `Ключ ${regKey.key} успешно создан` })
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

module.exports = router
