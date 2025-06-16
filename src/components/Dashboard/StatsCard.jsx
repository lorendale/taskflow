const StatsCard = ({ title, value, icon: Icon, color, bgColor }) => {
  return (
    <div className="stats-card">
      <div className="stats-card-header">
        <div className="stats-card-icon" style={{ backgroundColor: bgColor, color: color }}>
          <Icon size={24} />
        </div>
        <div className="stats-card-value">{value}</div>
      </div>
      <div className="stats-card-label">{title}</div>
    </div>
  )
}

export default StatsCard
