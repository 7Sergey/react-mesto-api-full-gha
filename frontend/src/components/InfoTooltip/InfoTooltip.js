import Success from '../../images/Union (1).svg'
import Fail from '../../images/Union.svg'
import PopupWithForm from '../PopupWithForm/PopupWithForm'

function InfoTooltip({ isSuccess, isOpen, onClose }) {
  return (
    <PopupWithForm
      title={
        isSuccess
          ? 'Вы успешно зарегистрировались!'
          : 'Что-то пошло не так! Попробуйте ещё раз.'
      }
      name={'avatar'}
      isOpen={isOpen}
      onClose={onClose}
      icon={
        <img
          className="popup__icon"
          src={isSuccess ? Success : Fail}
          alt="Иконка"
        />
      }
    ></PopupWithForm>
  )
}
export default InfoTooltip
