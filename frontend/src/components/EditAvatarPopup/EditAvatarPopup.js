import { useRef } from 'react'
import PopupWithForm from '../PopupWithForm/PopupWithForm'
import React from 'react'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [url, setUrl] = React.useState('')

  React.useEffect(() => {
    setUrl('')
  }, [isOpen])
  function handleInputChange(e) {
    setUrl(e.target.value)
  }

  const textInput = useRef(null)
  function handleSubmit(e) {
    e.preventDefault()
    textInput.current.focus()

    onUpdateAvatar({
      avatar: textInput.current.value,
    })
  }
  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'avatar'}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <input
        value={url}
        onChange={handleInputChange}
        ref={textInput}
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        name="avatar"
        type="url"
        required
      />
      <span
        className="popup__error"
        id="avatar-error"
      ></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
