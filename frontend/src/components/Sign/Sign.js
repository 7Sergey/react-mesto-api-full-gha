function Sign({ title, name, children, buttonText, onSubmit, link }) {
  return (
    <section className="sign">
      <h2 className="sign__title">{title}</h2>
      <form
        onSubmit={onSubmit}
        className="sign__form"
        name={`${name}-form`}
        noValidate
      >
        {children}
        <button
          type="submit"
          className="sign__button"
          aria-label="Сохранить изменения"
        >
          {buttonText}
        </button>
        {link || null}
      </form>
    </section>
  )
}

export default Sign
