import { useState, useEffect, useReducer } from 'react';

const initCounter = { value: 0 };

function counterReducer(state, action) {
  console.log('action ===', action);

  switch (action.type) {
    case 'UPBY':
      return { value: state.value + action.payload };
    case 'UP':
      return { value: state.value + 1 };
    case 'DOWN':
      return { value: state.value - 1 };
    case 'RESET':
      return { value: 0 };
    default:
      // throw new Error('tokio action tipo nera');
      console.warn('tokio action tipo nera');
      return initCounter;
  }
}
function Counter(props) {
  // sukurti state counterValue
  // const [counterState, setCounterState] = useState(initCounter);
  const [state, dispatch] = useReducer(counterReducer, initCounter);

  // sukurti fn handleUp, handleDown, handleUpBy, handleReset
  function handleUp() {
    dispatch({ type: 'UP' });
  }
  function handleDown() {
    dispatch({ type: 'DOWN' });
  }
  function handleUpBy(howMuch) {
    dispatch({ type: 'UPBY', payload: howMuch });
  }
  function handleReset() {
    dispatch({ type: 'RESET' });
  }

  return (
    <div className='card counter'>
      <p>Counter</p>
      <h2>{state.value}</h2>
      <div className='ctrl'>
        <button onClick={handleUp}>up</button>
        <button onClick={handleDown}>down</button>
        <button onClick={() => handleUpBy(10)}>up by 10</button>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  );
}
export default Counter;
