import { useState, useEffect } from 'react';
import TaskItem from '../components/TaskItem';

const Tasks = () => {
  const [courses] = useState(() => {
    const saved = localStorage.getItem('study_courses');
    return saved ? JSON.parse(saved) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('study_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [newTaskTime, setNewTaskTime] = useState(''); // ۱. استیت جدید برای زمان

  useEffect(() => {
    localStorage.setItem('study_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    // چک کردن پر بودن فیلدها
    if (!newTaskTitle || !selectedCourse || !newTaskTime) {
        return alert("Please fill title, course and time!");
    }

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      courseName: selectedCourse,
      startTime: newTaskTime, // ۲. اضافه شدن زمان به آبجکت تسک
      completed: false,
      poms: 0 // تعداد ستاره‌های اولیه
    };

    setTasks([...tasks, newTask]);
    // ریست کردن فرم
    setNewTaskTitle('');
    setNewTaskTime('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 fw-bold">Task Management</h3>

      <div className="card shadow-sm border-0 mb-4 rounded-4">
        <div className="card-body p-4">
          <form className="row g-3" onSubmit={handleAddTask}>
            {/* فیلد عنوان */}
            <div className="col-md-4">
              <label className="form-label small fw-bold">Task Title</label>
              <input 
                type="text" 
                className="form-control rounded-pill" 
                placeholder="What to study?" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </div>
            
            {/* منوی انتخاب درس */}
            <div className="col-md-3">
              <label className="form-label small fw-bold">Course</label>
              <select 
                className="form-select rounded-pill" 
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select Course...</option>
                {courses.map(course => (
                  <option key={course.id} value={course.title}>{course.title}</option>
                ))}
              </select>
            </div>

            {/* ۳. فیلد انتخاب زمان */}
            <div className="col-md-3">
              <label className="form-label small fw-bold">Start Time</label>
              <input 
                type="time" 
                className="form-control rounded-pill" 
                value={newTaskTime}
                onChange={(e) => setNewTaskTime(e.target.value)}
              />
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold">Add Task</button>
            </div>
          </form>
        </div>
      </div>

      <div className="list-group shadow-sm rounded-4 overflow-hidden">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={() => toggleTask(task.id)} 
              onDelete={() => deleteTask(task.id)}
            />
          ))
        ) : (
          <div className="p-5 text-center text-muted bg-white">
             <i className="bi bi-clipboard-x display-4 opacity-25"></i>
             <p className="mt-2">No tasks yet. Plan your day above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;