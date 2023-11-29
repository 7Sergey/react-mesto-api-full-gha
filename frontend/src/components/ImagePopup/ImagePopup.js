function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section className={`popup popup-zoom  ${isOpen && 'popup_opened'}`}>
      <div className="popup-zoom__container">
        <img
          src={card.link}
          alt={`Увеличенное изображение ${card.name}`}
          className="popup-zoom__image"
        />
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть попап"
          onClick={() => onClose()}
        ></button>
        <p className="popup-zoom__title">{card.name}</p>
      </div>
    </section>
  )
}
export default ImagePopup
