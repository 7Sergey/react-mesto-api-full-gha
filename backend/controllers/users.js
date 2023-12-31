const bcrypt = require('bcryptjs') // импортируем bcrypt
const User = require('../models/User')

const { SALT_ROUNDS } = require('../constants/constants')
const { generateToken } = require('../utils/jwt')
const NotFoundError = require('../errors/not-found')
const UnauthorizedError = require('../errors/unauthorized')

const getUsers = async (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users)
    })
    .catch(next)
}

const getUserById = async (req, res, next) => {
  const { idUser } = req.params // Забирает id из адресной строки '/:id'

  return User.findById(idUser)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден')
      }
      res.send(user) // Вернули пользователя
    })
    .catch(next)
}
const createUser = async (req, res, next) => {
  try {
    // хешируем пароль
    const { name, about, avatar, email, password } = req.body
    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })

    // Создаем новый объект пользователя без хеша
    const userWithoutHash = {
      _id: newUser._id,
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
    }
    // вернем пользователя без хеша
    res.status(201).send({ data: userWithoutHash })
  } catch (error) {
    next(error)
  }
}

const patchUser = async (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        const err = new NotFoundError('Пользователь по id не найден')
        next(err)
        return
      }
      res.send({ data: updatedUser })
    })

    .catch(next)
}

const patchAvatar = async (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const err = new NotFoundError('Пользователь по id не найден')
      next(err)
    })
    .then((user) => {
      res.send({ data: user })
    })
    .catch(next)
}

const login = (req, res, next) => {
  const { email, password } = req.body

  let foundUser // Объявляем переменную здесь, чтобы она была видна в обоих блоках .then

  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      const err = new UnauthorizedError(
        'Для доступа к защищенным страницам необходимо авторизоваться.',
      )
      next(err)
    })
    .then((user) => {
      foundUser = user
      return bcrypt.compare(String(password), user.password)
    })
    .then((matched) => {
      if (!matched) {
        const err = new UnauthorizedError(
          'Для доступа к защищенным страницам необходимо авторизоваться.',
        )
        next(err)
        return
      }

      const token = generateToken({ _id: foundUser._id })
      res.cookie('userToken', token, {
        httpOnly: true,
        sameSite: true,
        // срок действия токена 1 неделя
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      res.send({ email: foundUser.email })
    })
    .catch(next)
}

const getCurrentUser = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id)

    // Проверяем, существует ли пользователь
    if (!currentUser) {
      const err = new NotFoundError('Пользователь не найден')
      next(err)
    }

    // Отправляем информацию о пользователе в ответ
    return res.send(currentUser)
  } catch (error) {
    next(error)
  }
  // Добавляем возврат для устранения ошибки eslintconsistent-return
  return null
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchUser,
  patchAvatar,
  login,
  getCurrentUser,
}
