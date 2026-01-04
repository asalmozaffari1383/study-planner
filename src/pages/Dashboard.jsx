import { useState } from 'react';
import DashboardCards from '../components/DashboardCards';

const Dashboard = () => {
  const [stats] = useState(() => {
    const savedCourses = JSON.parse(localStorage.getItem('study_courses') || '[]');
    const savedTasks = JSON.parse(localStorage.getItem('study_tasks') || '[]');
    const doneCount = savedTasks.filter(t => t.completed).length;

    return {
      courses: savedCourses.length,
      done: doneCount,
      pending: savedTasks.length - doneCount
    };
  });

  return (
    <div className="container-fluid p-4">
      
      <div className="welcome-banner p-5 mb-4 rounded-5 text-white shadow" 
           style={{ background: 'linear-gradient(135deg, #1e1e2f 0%, #4e73df 100%)' }}>
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="fw-bold display-5">Hello, Asal! ✨</h1>
            <p className="lead opacity-75">You've completed {stats.done} tasks so far.</p>
            <button className="btn btn-light btn-lg rounded-pill px-4 mt-2 fw-bold text-primary shadow-sm">
              View My Schedule
            </button>
          </div>
          <div className="col-md-4 text-center d-none d-md-block">
             <i className="bi bi-rocket-takeoff display-1 opacity-50"></i>
          </div>
        </div>
      </div>

      <h4 className="mb-4 fw-bold text-dark">Quick Stats</h4>
      <DashboardCards 
        coursesCount={stats.courses} 
        tasksDone={stats.done} 
        tasksPending={stats.pending} 
      />
    </div>
  );
};

export default Dashboard;