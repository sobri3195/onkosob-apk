const SectionHeader = ({ title, subtitle }) => (
  <header className="section-header">
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </header>
)

export default SectionHeader
