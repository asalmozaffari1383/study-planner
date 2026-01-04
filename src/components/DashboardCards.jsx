const DashboardCards = ({ coursesCount, tasksDone, tasksPending }) => {
  const stats = [
    { title: "Courses", value: coursesCount, icon: "bi-book", color: "#4e73df", bg: "#f8f9fc" },
    { title: "Done Tasks", value: tasksDone, icon: "bi-check-circle", color: "#1cc88a", bg: "#f6fefb" },
    { title: "Pending", value: tasksPending, icon: "bi-clock-history", color: "#f6c23e", bg: "#fffdf5" }
  ];

  return (
    <div className="row g-4">
      {stats.map((stat, index) => (
        <div className="col-md-4" key={index}>
          <div className="stat-card h-100 shadow-sm border-0 p-4 rounded-4" style={{ backgroundColor: '#fff' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted text-uppercase small fw-bold mb-1">{stat.title}</h6>
                <h2 className="mb-0 fw-bold" style={{ color: stat.color }}>{stat.value}</h2>
              </div>
              <div className="icon-box rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ width: '50px', height: '50px', backgroundColor: stat.bg, color: stat.color }}>
                <i className={`bi ${stat.icon} fs-3`}></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;