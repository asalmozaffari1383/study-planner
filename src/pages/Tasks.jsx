import { useState, useEffect } from 'react';
import TaskItem from '../components/TaskItem';

const Tasks = () => {
  // ۱. گرفتن لیست درس‌ها برای منوی کشویی
  const [courses] = useState(() => {
    const saved = localStorage.getItem('study_courses');
    return saved ? JSON.parse(saved) : [];
  });

  // ۲. استیت برای تسک‌ها (با قابلیت ذخیره‌سازی)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('study_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // ۳. ذخیره در LocalStorage هر وقت تسک‌ها عوض شدند
  useEffect(() => {
    localStorage.setItem('study_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle || !selectedCourse) return alert("Please fill title and select a course!");

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      courseName: selectedCourse,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Task Management</h3>

      {/* فرم افزودن تسک */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <form className="row g-3" onSubmit={handleAddTask}>
            <div className="col-md-6">
              <input 
                type="text" 
                className="form-control" 
                placeholder="What needs to be done?" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select 
                className="form-select" 
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select Course...</option>
                {courses.map(course => (
                  <option key={course.id} value={course.title}>{course.title}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">Add Task</button>
            </div>
          </form>
        </div>
      </div>

      {/* لیست تسک‌ها */}
      <div className="list-group shadow-sm">
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
          <div className="p-4 text-center text-muted">No tasks yet. Add one above!</div>
        )}
      </div>
    </div>
  );
};

export default Tasks;