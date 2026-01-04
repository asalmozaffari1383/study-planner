const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-light' : ''}`}>
      <div className="d-flex align-items-center">
        <input 
          className="form-check-input me-3" 
          type="checkbox" 
          checked={task.completed} 
          onChange={onToggle} 
        />
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#6c757d' : '#000' }}>
          <strong>{task.title}</strong> 
          <span className="badge bg-info ms-2" style={{fontSize: '10px'}}>{task.courseName}</span>
        </span>
      </div>
      <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
        <i className="bi bi-trash"></i> Delete
      </button>
    </div>
  );
};

export default TaskItem;