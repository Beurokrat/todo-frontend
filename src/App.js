import TodoList from './components/TodoList';

function App() {
  return (
    <div className='App bg-gray-300 w-full h-screen p-10'>
      <div className='bg-white h-full w-[80%] mx-auto rounded-xl p-10'>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
