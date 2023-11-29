import PopupWithForm from '../PopupWithForm/PopupWithForm'
import React from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [data, setData] = React.useState({ name: '', about: '' })
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setData({ name: currentUser.name, about: currentUser.about })
  }, [currentUser, isOpen])

  function handleInputChange(e, name) {
    setData({ ...data, [name]: e.target.value }) //динамическое создание свойства черезез []
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: data.name,
      about: data.about,
    })
  }

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'profile'}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <input
        value={data.name || ''}
        onChange={(e) => handleInputChange(e, 'name')}
        className="popup__input popup__input_type_profile"
        placeholder="Имя"
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        className="popup__error"
        id="profile-error"
      ></span>
      <input
        value={data.about || ''}
        onChange={(e) => handleInputChange(e, 'about')}
        className="popup__input popup__input_type_about"
        type="text"
        placeholder="О себе"
        name="about"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        className="popup__error"
        id="about-error"
      ></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
