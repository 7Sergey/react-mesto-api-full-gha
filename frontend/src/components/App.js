import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import PopupWithForm from './PopupWithForm/PopupWithForm'
import EditProfilePopup from './EditProfilePopup/EditProfilePopup'
import ImagePopup from './ImagePopup/ImagePopup'
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup'
import React from 'react'
import { api } from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import AddPlacePopup from './AddPlacePopup/AddPlacePopup '
import { Routes, Route, useNavigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import Login from './Login/Login'
import Register from './Register/Register'
import InfoTooltip from './InfoTooltip/InfoTooltip'
import { authorize, getContent, register } from '../utils/auth'

function App() {
  // состояния для открытия попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false)
  const [isEditAvatar, setIsEditAvatar] = React.useState(false)
  const [isAddPlace, setIsAddPlace] = React.useState(false)
  const [isImagePopup, setIsImagePopup] = React.useState(false)
  const [isInfoTooltipPopup, setInfoTooltipPopup] = React.useState(false)

  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' })

  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' }) //данные текущего пользователя

  const [cards, setCards] = React.useState([]) //карточки

  const [isLoggedIn, setisLoggedIn] = React.useState(false) //залогинен?
  const [isSuccess, setisSuccess] = React.useState('') //успешно ли зашел или зарегистрировался

  const [userData, setUserData] = React.useState({
    _id: '',
    email: '',
  })

  const navigate = useNavigate()

  React.useEffect(() => {
    api
      .getProfile()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch(console.log)
  }, [])

  React.useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards)
      })
      .catch(console.log)
  }, [])

  const auth = (token) => {
    getContent(token)
      .then((res) => {
        setUserData(res.data)
        setisLoggedIn(true)
        navigate('7Sergey/mesto-react')
      })
      .catch(() => {
        setisLoggedIn(false)
        navigate('7Sergey/mesto-react/sign-in')
      })
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    auth(token)
  }, [])

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatar(false)
    setIsAddPlace(false)
    setIsImagePopup(false)
    setInfoTooltipPopup(false)
  }

  const onCardClick = (card) => {
    setIsImagePopup(true) //для плавности открытия, и чтобы не было видимости пустых полей
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => {
          return cards.map((c) => (c._id === card._id ? newCard : c)) //проходимся по массиву. Находим в нем лайкнутую(дизлайкнутую) карточку и заменяем её на новую копию
        })
      })
      .catch(console.log)
  }
  function handleCardDelete(card) {
    //удаление карточки
    api
      .deleteCard(card._id)
      .then((res) => {
        //обновленией стейта с карточками
        setCards(
          cards.filter((c) => {
            //с -- очередная карточка из массива cards
            return c !== card //возвращаем false, если находим карточку, которую удаляли. Метод filter не добавит его в новый массив cards
          })
        )
      })
      .catch(console.log)
  }
  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
  }
  function handleUpdateAvatar(data) {
    api
      .editAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(console.log)
  }
  const handleLogin = (data) => {
    return authorize(data.email, data.password)
      .then((res) => {
        if (res.token) {
          setUserData(data)
          setisLoggedIn(true)
          localStorage.setItem('token', res.token)
        }
      })
      .catch(() => {
        setisSuccess(false)
        setInfoTooltipPopup(true)
      })
  }

  const handleRegister = (data) => {
    return register(data.email, data.password)
      .then((res) => {
        setisSuccess(true)
        setInfoTooltipPopup(true)

        return res
      })
      .catch(() => {
        setisSuccess(false)
        setInfoTooltipPopup(true)
      })
  }

  return (
    <div className="body">
      <Routes>
        <Route
          path="7Sergey/mesto-react/"
          element={
            <Header
              userData={userData}
              setisLoggedIn={setisLoggedIn}
            />
          }
        >
          <Route
            index
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <CurrentUserContext.Provider value={currentUser}>
                    <Main
                      onEditAvatar={() => {
                        setIsEditAvatar(!isEditAvatar)
                      }}
                      onEditProfile={() => {
                        setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
                      }}
                      onAddPlace={() => {
                        setIsAddPlace(!isAddPlace)
                      }}
                      onCardClick={onCardClick}
                      handleCardLike={handleCardLike}
                      handleCardDelete={handleCardDelete}
                      cards={cards}
                    />
                    <Footer />
                    <EditProfilePopup
                      isOpen={isEditProfilePopupOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                    />
                    <EditAvatarPopup
                      isOpen={isEditAvatar}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                    />
                    <AddPlacePopup
                      isOpen={isAddPlace}
                      onClose={closeAllPopups}
                      addPlaceSubmit={handleAddPlaceSubmit}
                    />

                    <PopupWithForm
                      title={'Вы уверены?'}
                      name={'confirm-delete'}
                      buttonText={'Да'}
                    ></PopupWithForm>

                    <ImagePopup
                      card={selectedCard}
                      isOpen={isImagePopup}
                      onClose={closeAllPopups}
                    />
                  </CurrentUserContext.Provider>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="sign-in"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="sign-up"
            element={<Register onRegister={handleRegister} />}
          />
        </Route>
      </Routes>
      <InfoTooltip
        isSuccess={isSuccess}
        isOpen={isInfoTooltipPopup}
        onClose={closeAllPopups}
      />
    </div>
  )
}

export default App
