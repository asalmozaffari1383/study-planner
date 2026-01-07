import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Tasks from './pages/Tasks';
import Pomodoro from './pages/Pomodoro';
import Schedule from './pages/Schedule';
import AIPlanner from './pages/AIPlanner'; // ۱. حتماً این ایمپورت رو چک کن

function App() {
  // بخش حذف خودکار تسک‌های قدیمی
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('study_tasks')) || [];
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    const activeTasks = savedTasks.filter(task => {
      const isOldCompleted = task.completed && (now - task.id > ONE_DAY);
      return !isOldCompleted;
    });

    localStorage.setItem('study_tasks', JSON.stringify(activeTasks));
  }, []);

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
          {/* ۲. این خط جادویی رو اضافه کردیم */}
          <Route path="/ai-planner" element={<AIPlanner />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;