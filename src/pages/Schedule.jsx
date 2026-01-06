import { useState } from 'react';

const Schedule = () => {
  const [tasks] = useState(() => JSON.parse(localStorage.getItem('study_tasks')) || []);

  // جدا کردن تسک‌های انجام شده و باقی‌مانده
  const pendingTasks = tasks.filter(t => !t.completed);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold m-0">📅 My Study Schedule</h3>
        <span className="badge bg-primary rounded-pill p-2 px-3">{pendingTasks.length} Tasks Remaining</span>
      </div>

      <div className="timeline">
        {pendingTasks.length > 0 ? (
          pendingTasks.map((task, index) => (
            <div key={task.id} className="card border-0 shadow-sm rounded-4 mb-3 p-3 border-start border-4 border-primary">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold mb-1">{task.title}</h6>
                  <span className="badge bg-info bg-opacity-10 text-info small">{task.courseName}</span>
                </div>
                <div className="text-muted small">
                  <i className="bi bi-clock me-1"></i> 
                  {index === 0 ? "Next Up" : `Task #${index + 1}`}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-5 bg-white rounded-5 shadow-sm">
            <i className="bi bi-calendar-check display-1 text-muted opacity-25"></i>
            <p className="mt-3 text-muted">All caught up! No scheduled tasks for now.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;