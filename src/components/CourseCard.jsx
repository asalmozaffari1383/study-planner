const CourseCard = ({ title, progress, onDelete }) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="mt-3">
          <small className="text-muted">Progress: {progress}%</small>
          <div className="progress mt-2" style={{ height: '8px' }}>
            <div 
              className="progress-bar bg-primary" 
              role="progressbar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-3 d-flex justify-content-end gap-2">
          <button className="btn btn-outline-primary btn-sm">View</button>
          <button className="btn btn-outline-danger btn-sm"onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;