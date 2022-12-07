import './App.css';
import Counter from './components/counter/Counter';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div className='App container'>
      <h1>React</h1>
      <div className='grid'>
        {/* <Counter /> */}
        <RegisterForm />
      </div>
    </div>
  );
}

export default App;
