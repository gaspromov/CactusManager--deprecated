const mongoose = require('mongoose')
const app = require('./app')

const { PORT, MONGODB_URI } = require('./config/keys')

const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, mongodbOptions)
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
  } catch (e) {
    console.log('Ошибка при запуске сервера')
  }
}

start()
