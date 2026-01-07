import { useState } from 'react';

const Schedule = () => {
  const [tasks] = useState(() => JSON.parse(localStorage.getItem('study_tasks')) || []);

  // ۱. فیلتر کردن تسک‌های انجام نشده و مرتب‌سازی بر اساس ساعت
  const pendingTasks = tasks
    .filter(t => !t.completed)
    .sort((a, b) => (a.startTime || "00:00").localeCompare(b.startTime || "00:00"));

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold m-0">📅 My Study Schedule</h3>
          <p className="text-muted small mb-0">Sorted by your study hours</p>
        </div>
        <span className="badge bg-primary rounded-pill p-2 px-3">
          {pendingTasks.length} Tasks Remaining
        </span>
      </div>

      <div className="timeline-container">
        {pendingTasks.length > 0 ? (
          pendingTasks.map((task, index) => (
            <div 
              key={task.id} 
              className={`card border-0 shadow-sm rounded-4 mb-3 p-3 border-start border-4 ${index === 0 ? 'border-warning' : 'border-primary'}`}
              style={{ background: index === 0 ? 'linear-gradient(to right, #fffdf5, #ffffff)' : 'white' }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  {/* دایره زمان کنار هر تسک */}
                  <div className={`rounded-circle p-2 me-3 text-center ${index === 0 ? 'bg-warning text-dark' : 'bg-light text-primary'}`} style={{ width: '65px' }}>
                    <small className="fw-bold d-block" style={{ fontSize: '12px' }}>{task.startTime}</small>
                  </div>
                  
                  <div>
                    <h6 className={`fw-bold mb-1 ${index === 0 ? 'text-dark' : ''}`}>
                      {task.title}
                      {index === 0 && <span className="badge bg-warning text-dark ms-2 small" style={{ fontSize: '10px' }}>NEXT UP</span>}
                    </h6>
                    <span className="badge bg-info bg-opacity-10 text-info small">{task.courseName}</span>
                  </div>
                </div>

                <div className="text-muted">
                   <i className="bi bi-arrow-right-short fs-4"></i>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-5 bg-white rounded-5 shadow-sm border border-dashed">
            <i className="bi bi-calendar-check display-1 text-muted opacity-25"></i>
            <h5 className="mt-3 fw-bold text-muted">Hooray! Nothing scheduled.</h5>
            <p className="text-muted">Go to Tasks and plan your next session.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;