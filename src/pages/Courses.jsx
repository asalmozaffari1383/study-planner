import { useState, useEffect } from 'react'; // اضافه کردن useEffect
import CourseCard from '../components/CourseCard';

const Courses = () => {
  // ۱. مقدار اولیه را از LocalStorage می‌گیریم
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('study_courses');
    return savedCourses ? JSON.parse(savedCourses) : [
      { id: 1, title: 'React Basics', progress: 60 },
      { id: 2, title: 'Advanced Sass', progress: 40 }
    ];
  });

  const [newCourseTitle, setNewCourseTitle] = useState('');

  // ۲. هر وقت لیست درس‌ها تغییر کرد، آن را در LocalStorage ذخیره کن
  useEffect(() => {
    localStorage.setItem('study_courses', JSON.stringify(courses));
  }, [courses]); // این یعنی فقط وقتی "courses" عوض شد، این کد اجرا شود

  const handleAddCourse = () => {
    if (newCourseTitle.trim() === '') return;

    const newCourse = {
      id: Date.now(),
      title: newCourseTitle,
      progress: 0
    };

    setCourses([...courses, newCourse]);
    setNewCourseTitle('');
  };

  // تابع حذف درس (این هم اضافه کنیم که پروژه کامل‌تر شود)
  const deleteCourse = (id) => {
    const updatedCourses = courses.filter(course => course.id !== id);
    setCourses(updatedCourses);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>My Courses</h3>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCourseModal">
          + Add New Course
        </button>
      </div>

      <div className="row g-4">
        {courses.map(course => (
          <div className="col-md-4" key={course.id}>
            {/* پاس دادن تابع حذف به کارت */}
            <CourseCard 
              title={course.title} 
              progress={course.progress} 
              onDelete={() => deleteCourse(course.id)} 
            />
          </div>
        ))}
      </div>

      {/* مودال (همان کد قبلی) */}
      <div className="modal fade" id="addCourseModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Course</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Course Title" 
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleAddCourse} data-bs-dismiss="modal">Save Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;