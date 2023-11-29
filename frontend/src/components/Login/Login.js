import React from 'react'
import Sign from '../Sign/Sign'
import { useNavigate } from 'react-router-dom'

function Login({ onLogin }) {
  const [data, setData] = React.useState({ email: '', password: '' })
  const navigate = useNavigate()
  function handleInputChange(e, name) {
    setData({ ...data, [name]: e.target.value }) //динамическое создание свойства черезез []
  }

  function handleSubmit(e) {
    e.preventDefault()
    onLogin(data)
      .then(() => {
        navigate('/7Sergey/mesto-react')
      })
      .then(() => {
        setData('')
      })
      .catch(console.log)
  }
  return (
    <>
      <Sign
        title={'Вход'}
        name={'profile'}
        buttonText={'Войти'}
        onSubmit={handleSubmit}
      >
        {' '}
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

export default Login
