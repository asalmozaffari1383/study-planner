const DashboardCard = ({ title, value, icon, color }) => (
  <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
    <div className="d-flex align-items-center">
      <div className={`icon-box bg-${color} bg-opacity-10 p-3 rounded-4 me-3 text-${color}`}>
        <i className={`bi ${icon}`} style={{ fontSize: '24px' }}></i>
      </div>
      <div>
        <h6 className="text-muted mb-1" style={{ fontSize: '12px' }}>{title}</h6>
        <h4 className="fw-bold mb-0">{value}</h4>
      </div>
    </div>
  </div>
);
export default DashboardCard;