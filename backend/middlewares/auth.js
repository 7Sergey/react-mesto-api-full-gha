const jwt = require('jsonwebtoken') // импортируем модуль jsonwebtoken

require('dotenv').config() // Подключаем переменные окружения из файла .env

const { JWT_SECRET, NODE_ENV } = process.env
console.log('JWT_SECRET:', JWT_SECRET)
console.log('NODE_ENV:', NODE_ENV)

const UnauthorizedError = require('../errors/unauthorized')

function auth(req, res, next) {
  let payload
  try {
    const token = req.cookies.userToken

    console.log('token:', token)
    if (!token) {
      throw new UnauthorizedError('NotAuthenticate')
    }
    const validToken = token.replace('Bearer ', '')
    console.log('validToken:', validToken)
    // Добавлена проверка наличия строки "Bearer "
    payload = jwt.verify(
      validToken,
      NODE_ENV !== 'production' ? JWT_SECRET : 'dev_secret',
    )
    console.log('payload:', payload)
    // Присваиваем айди пользователя для удаления/добавления лайков
    req.user = payload
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      // Обработка ошибки верификации токена
      const err = new UnauthorizedError('InvalidToken')
      next(err)
    } else {
      next(error)
    }
  }
}
module.exports = {
  auth,
}
