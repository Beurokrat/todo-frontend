import api from './api';

const getTodos = (page) => api.get(`/todos?page=${page}`);

const createTodo = (todo) => api.post('/todos', todo);

const updateTodo = (id, updatedTodo) => api.put(`/todos/${id}`, updatedTodo);

const deleteTodo = (id) => api.delete(`/todos/${id}`);

export { getTodos, createTodo, updateTodo, deleteTodo };
