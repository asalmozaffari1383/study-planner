import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIPlanner = () => {
  const [hours, setHours] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

  const generatePlan = async () => {
    if (!hours || hours <= 0) return alert("Enter the time");
    
    setLoading(true);
    try {
      const savedCourses = JSON.parse(localStorage.getItem('study_courses')) || [];
      const courseList = savedCourses.length > 0 ? savedCourses.map(c => c.title).join(", ") : "General Lessons";

  
      const model = genAI.getGenerativeModel({ model: "gemini-pro" }); 
      
      const prompt = `I have these courses: [${courseList}]. I have ${hours} hours to study. 
      Create a study schedule. Return ONLY a JSON array: 
      [{"title": "Task Name", "courseName": "Course from my list", "startTime": "HH:mm"}]`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // جدا کردن جی‌سون از متن
      const start = text.indexOf("[");
      const end = text.lastIndexOf("]") + 1;
      const jsonStr = text.substring(start, end);
      
      setSuggestion(JSON.parse(jsonStr));
    } catch (error) {
      console.error("AI Error:", error);
      if (error.message.includes('fetch')) {
        alert("❌ VPN Error!check your connection");
      } else {
        alert("❌API or net connection.");
      }
    }
    setLoading(false);
  };

  const saveToTasks = () => {
    const currentTasks = JSON.parse(localStorage.getItem('study_tasks')) || [];
    const newTasks = suggestion.map(s => ({
      id: Date.now() + Math.random(),
      title: s.title,
      courseName: s.courseName,
      startTime: s.startTime,
      completed: false,
      poms: 0
    }));
    localStorage.setItem('study_tasks', JSON.stringify([...currentTasks, ...newTasks]));
    alert("plan added! 😍");
    setSuggestion(null);
  };

  return (
    <div className="container mt-4">
      <div className="card border-0 shadow-lg rounded-5 p-5 bg-white text-center">
        <h2 className="fw-bold text-primary mb-4">AI Study Planner 🤖</h2>
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <div className="input-group shadow-sm rounded-pill overflow-hidden">
              <input 
                type="number" 
                className="form-control border-0 ps-4" 
                placeholder="How much time do you have?" 
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
              <button className="btn btn-primary px-4 fw-bold" onClick={generatePlan} disabled={loading}>
                {loading ?'wait...' : 'create!'}
              </button>
            </div>
          </div>
        </div>

        {suggestion && (
          <div className="text-start">
            <h5 className="fw-bold mb-3">✅ AI suggestion:</h5>
            <div className="list-group mb-3">
              {suggestion.map((item, i) => (
                <div key={i} className="list-group-item border-0 shadow-sm rounded-4 mb-2 d-flex justify-content-between px-3 py-3">
                  <span><strong>{item.startTime}</strong> - {item.title}</span>
                  <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill">{item.courseName}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-success w-100 rounded-pill py-3 fw-bold" onClick={saveToTasks}>
             ADD to task list
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPlanner;