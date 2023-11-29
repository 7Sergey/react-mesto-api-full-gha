import React from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Card({ card, onCardClick, handleCardLike, handleCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)

  const isOwn = card.owner._id === currentUser._id // у владельца карточки будет отображаться корзина
  const isLiked = card.likes.some((i) => i._id === currentUser._id) //показывает, есть ли среди лайкнувших пользователь для раскраски кнопки лайка
  const cardLikeButtonClassName = `elements__button card__button ${
    isLiked && ' elements__button_active'
  }`

  return (
    <div className="elements__item card">
      <img
        className="elements__image card__image"
        alt={card.name}
        src={card.link}
        onClick={() => onCardClick(card)}
      />
      {isOwn && (
        <button
          type="button"
          className="elements__trash-button card__trash-button"
          onClick={() => {
            handleCardDelete(card)
          }}
        />
      )}

      <div className="elements__container card__container">
        <h2 className="elements__title card__title">{card.name}</h2>
        <div className="elements__likes-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => handleCardLike(card)}
          ></button>

          <p className="elements__likes-counter card__likes-counter">
            {card.likes.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card
