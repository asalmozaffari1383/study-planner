import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Tasks from './pages/Tasks';
import Pomodoro from './pages/Pomodoro';
import Schedule from './pages/Schedule';
function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;