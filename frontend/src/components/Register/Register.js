import React from 'react'
import Sign from '../Sign/Sign'
import { useNavigate, Link } from 'react-router-dom'

function Register({ onRegister }) {
  const [data, setData] = React.useState({ email: '', password: '' })
  const navigate = useNavigate()
  function handleInputChange(e, name) {
    setData({ ...data, [name]: e.target.value }) //динамическое создание свойства черезез []
  }

  function handleSubmit(e) {
    e.preventDefault()
    onRegister(data)
      .then(() => {
        navigate('/7Sergey/mesto-react/sign-in')
      })
      .then(() => {
        setData('')
      })
      .catch(console.log)
  }

  return (
    <>
      <Sign
        title={'Регистрация'}
        name={'profile'}
        buttonText={'Зарегистрироваться'}
        onSubmit={handleSubmit}
        link={
          <p className="">
            Уже зарегистрированы?&nbsp;
            <Link
              className="sign__link"
              to="../sign-in"
            >
              Войти
            </Link>
          </p>
        }
      >
        <input
          value={data.email || ''}
          onChange={(e) => handleInputChange(e, 'email')}
          className="sign__input"
          placeholder="Email"
          type="text"
          name="email"
          minLength="2"
          maxLength="40"
          required
        />
        <span
          className="popup__error"
          id="profile-error"
        ></span>
        <input
          value={data.password || ''}
          onChange={(e) => handleInputChange(e, 'password')}
          className="sign__input"
          type="password"
          placeholder="Пароль"
          name="password"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          className="popup__error"
          id="about-error"
        ></span>
      </Sign>
    </>
  )
}

export default Register
