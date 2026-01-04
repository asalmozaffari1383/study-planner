import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3 className="logo">Study Planner</h3>
      <ul className="menu">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/courses">Courses</NavLink>
        </li>
        <li>
          <NavLink to="/tasks">Tasks</NavLink>
        </li>
        <li>
          <NavLink to="/pomodoro">Pomodoro</NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;