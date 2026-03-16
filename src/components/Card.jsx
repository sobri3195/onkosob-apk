const Card = ({ title, subtitle, rightAction, children }) => (
  <section className="card">
    {(title || subtitle || rightAction) && (
      <header className="card__header">
        <div>
          {title && <h3>{title}</h3>}
          {subtitle && <p>{subtitle}</p>}
        </div>
        {rightAction}
      </header>
    )}
    <div className="card__body">{children}</div>
  </section>
)

export default Card
