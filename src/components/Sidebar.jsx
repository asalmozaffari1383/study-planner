import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar bg-dark text-white p-3">
      <div className="sidebar-brand mb-4">
        <h4 className="fw-bold text-primary">Study Planner</h4>
      </div>
      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/courses" className="nav-link text-white">
            <i className="bi bi-book me-2"></i> Courses
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/tasks" className="nav-link text-white">
            <i className="bi bi-list-check me-2"></i> Tasks
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/pomodoro" className="nav-link text-white">
            <i className="bi bi-clock-history me-2"></i> Pomodoro
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/schedule" className="nav-link text-white">
            <i className="bi bi-calendar3 me-2"></i> Schedule
          </Link>
        </li>
        {/* بخش جدید هوش مصنوعی */}
        <li className="nav-item">
          <Link to="/ai-planner" className="nav-link text-white bg-primary bg-opacity-10 rounded-3">
            <i className="bi bi-robot me-2 text-primary"></i> AI Planner
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;