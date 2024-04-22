import React, { useState } from 'react';

function TodoItem({ task, deleteTask, toggleCompleted }) {
  const [checked, setChecked] = useState(task.completed);

  const handleChange = () => {
    setChecked(!checked);
    toggleCompleted(task.id);
  };

  return (
    <div className='todo-item flex flex-row p-3 gap-4 border border-blue-300 rounded-xl m-2 justify-between'>
      <div className='flex flex-row gap-4 items-center'>
        <input type='checkbox' checked={checked} onChange={handleChange} />
        <p className={`${task.completed ? 'line-through' : ''}`}>{task.task}</p>
      </div>
      <button
        className='m-2 text-red-600 bg-red-200 rounded-xl p-2'
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
