const bcrypt = require('bcrypt')

const router = require('express').Router()

const {
  signUpValidators,
  signInValidators,
  adminValidators
} = require('../../utils/validators')
const { createJWT } = require('./auth.functions')

const { hasError } = require('../../middleware/validate.middleware')
const limitor = require('../../middleware/limit.middleware')

const User = require('../../models/User')

const { BCRYPT_SALT } = require('../../config/keys')

router.post('/signup', signUpValidators, hasError, async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await new User({
      name,
      email,
      password: await bcrypt.hash(password, BCRYPT_SALT)
    }).save()
    const accessToken = await createJWT(user.id)
    return res.status(200).json({ accessToken })
  } catch (e) {
    console.error(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

router.post('/signin', signInValidators, hasError, async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const areSame = user ? await bcrypt.compare(password, user.password) : false
    if (!user || !areSame) {
      return res.status(400).json({ message: 'Неверные данные' })
    }
    const accessToken = await createJWT(user.id)
    return res.status(200).json({ accessToken })
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

router.post('/admin', adminValidators, limitor, hasError, async (req, res) => {
  try {
    const accessToken = await createJWT('admin')
    return res.status(200).json({ accessToken })
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

module.exports = router
