import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../utils/todo.service';
import Pagination from './Pagination';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState(1);

  const fetchTasks = async (page) => {
    try {
      const response = await getTodos(page);
      setTasks(response.data.data);
      setPaginationData(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };
  useEffect(() => {
    fetchTasks(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const addTask = async (text) => {
    if (text.trim().length === 0) {
      alert('empty value');
      return;
    }

    try {
      const newTask = {
        created: Date.now(),
        task: text,
        completed: false,
      };
      await createTodo(newTask);
      await fetchTasks();
      setText('');
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTodo(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const taskToToggle = tasks.find((task) => task.id === id);
      const updatedTask = {
        ...taskToToggle,
        completed: !taskToToggle.completed,
      };
      await updateTodo(id, updatedTask);
      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            return updatedTask;
          } else {
            return task;
          }
        })
      );
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
    }
  };

  return (
    <div className='todo-list'>
      <div className='m-2 w-full flex flex-row gap-4'>
        <input
          className='p-3 rounded-xl w-[80%] border border-black'
          value={text}
          placeholder='Add Task'
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className='text-green-600 bg-green-200 w-[20%] rounded-xl p-2'
          onClick={() => addTask(text)}
        >
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
      <Pagination
        page={page}
        totalPages={paginationData.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default TodoList;
