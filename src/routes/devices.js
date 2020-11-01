const router = require('express').Router()

const userAuth = require('../middleware/user.middleware')
const License = require('../models/License')
const { hasError } = require('../middleware/validate.middleware')
const {
  addDeviceValidators,
  deleteDeviceValidators
} = require('../utils/validators/device.validator')

router.post('/', addDeviceValidators, hasError, async (req, res) => {
  try {
    const { key, device } = req.body
    const license = await License.findOne({ key })
    if (!license.quantity || license.devices.length < license.quantity) {
      if (!license.devices.includes(device)) {
        license.devices.push(device)
      }
    } else {
      return res
        .status(400)
        .json({ message: 'Привышено максимальное количество использований' })
    }
    await license.save()
    return res.status(200).json({ message: 'Добавлено' })
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

router.delete(
  '/',
  userAuth,
  deleteDeviceValidators,
  hasError,
  async (req, res) => {
    try {
      const { id } = req.body
      const license = await License.findByIdAndUpdate(
        id,
        { devices: [] },
        { new: true }
      )
      if (!license) {
        return res
          .status(400)
          .json({ message: 'Не удалось сбросить активации' })
      }
      return res.status(200).json(license)
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
  }
)

module.exports = router
