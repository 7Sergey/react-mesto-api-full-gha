function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  icon,
}) {
  return (
    <section className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть попап"
          onClick={() => onClose()}
        ></button>
        {icon || null}
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className={`popup__form popup__form_${name}`}
          name={`${name}-form`}
          noValidate
        >
          {children}

          {buttonText && (
            <button
              type="submit"
              className="popup__button"
              aria-label="Сохранить изменения"
            >
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm
