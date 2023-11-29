import { Outlet, useMatch, useNavigate, Link } from 'react-router-dom'

function Header({ userData, setisLoggedIn }) {
  const navigate = useNavigate()

  const href = useMatch({ path: `${window.location.pathname}`, end: false })
  const isRootHref = href.pathname.endsWith('/7Sergey/mesto-react')
  const isLoginHref = href.pathname.endsWith('/7Sergey/mesto-react/sign-in')
  function onClick() {
    localStorage.removeItem('token')
    navigate('/7Sergey/mesto-react/sign-in', { replace: true })
    setisLoggedIn(false)
  }
  return (
    <>
      <header className="header">
        <div className="header__logo"></div>
        <div className="header__container">
          {isRootHref ? (
            <>
              <p className="header__email">{userData?.email}</p>
              <button
                className="header__button"
                type="button"
                aria-label="Выход из личного кабинета"
                onClick={onClick}
              >
                Выйти
              </button>
            </>
          ) : (
            <Link
              className="header__button"
              to={isLoginHref ? './sign-up' : './sign-in'}
            >
              {isLoginHref ? 'Регистрация' : 'Войти'}
            </Link>
          )}
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Header
