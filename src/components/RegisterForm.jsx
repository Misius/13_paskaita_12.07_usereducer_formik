import { useReducer, useState } from 'react';

const initFormValues = {
  email: '',
  password: '',
  repeatPassword: '',
  feedback: '',
  hideFormSuccess: false,
  formRegisterFeedback: '',
  formSuccess: { id: '', token: '' },
};
// sukurti switch
// padaryti kad email reiksme susipildytu ivedant
function registerReducer(state, action) {
  console.log('action ===', action);
  switch (action.type) {
    case 'formSuccess':
      return { ...state, formSuccess: action.payload };
    case 'formSent':
      return { ...state, formRegisterFeedback: action.payload };
    case 'feedback':
      return { ...state, feedback: action.payload };
    case 'email':
      return {
        ...state,
        email: action.payload,
      };
    case 'password':
      return { ...state, password: action.payload };
    case 'repeatPassword':
      return { ...state, repeatPassword: action.payload };
    default:
      console.warn('tokio tipo action nera');
      return initFormValues;
  }
}

function RegisterForm(props) {
  const [state, dispatch] = useReducer(registerReducer, initFormValues);
  // const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
  const doPasswordsAreEqual = state.password === state.repeatPassword;

  const submitHandler = (e) => {
    // padaryti kad forma neperkrautu psl
    e.preventDefault();
    // patikrinti ar sutampa slaptazodziai
    // pranesti vartotojui ar sutampa ar ne su tekstu virs formos

    if (doPasswordsAreEqual) {
      dispatch({ type: 'feedback', payload: 'Passwords match OK' });
      // 1P. siusti su fetch i https://reqres.in/api/register
      // objekta kuris turi email ir password
      const newUserObj = {
        email: state.email,
        password: state.password,
      };
      registerUserFetch(newUserObj).then((rez) => {
        if (rez.error) {
          // klaida
          console.log('klaida', rez.error);
          dispatch({ type: 'formSent', payload: rez.error });
        } else if (rez.token) {
          // sekme
          console.log('sekme', rez.token);
          dispatch({
            type: 'formSuccess',
            payload: { id: rez.id, token: rez.token },
          });
        }
      });
      // 2P. jei gaunam sekminga atsakyma, paslepti forma ir parodyti sekmes kortele kurioje atspausdinta tokenas ir userio id.
      // 3P. jei atsakymas nesekmmingas, tai virs formos pranesame kokia klaida is atsakymo.
    } else {
      dispatch({
        type: 'feedback',
        payload: 'please check passwords do not match!!!',
      });
    }
  };

  return (
    <div>
      <h2>Register here</h2>
      {state.formRegisterFeedback && <h2>{state.formRegisterFeedback}</h2>}
      {!state.formSuccess.token && (
        <>
          <form onSubmit={submitHandler} className='card' autoComplete='off'>
            <input
              onChange={(e) =>
                dispatch({ type: 'email', payload: e.target.value })
              }
              value={state.email}
              type='text'
              placeholder='email'
            />
            <h3>{state.feedback}</h3>
            <input
              onChange={(e) =>
                dispatch({ type: 'password', payload: e.target.value })
              }
              value={state.password}
              type='password'
              placeholder='password'
            />
            <input
              onChange={(e) =>
                dispatch({ type: 'repeatPassword', payload: e.target.value })
              }
              value={state.repeatPassword}
              type='password'
              placeholder='repeat password'
            />
            <button type='submit'>Login</button>
          </form>
        </>
      )}
      {state.formSuccess.token && (
        <>
          <div className='card'>
            <h2>Welcome {state.email}</h2>
            <h4>your id is {state.formSuccess.id}</h4>
            <p>your token is: {state.formSuccess.token}</p>
          </div>
        </>
      )}
      {!props.hideDebug && (
        <>
          <hr />
          <h3>Debug values</h3>
          <p>Email: {state.email}</p>
          <p>Password: {state.password}</p>
          <p>Repeat Password: {state.repeatPassword}</p>
          <p>Do they match: {doPasswordsAreEqual.toString()}</p>
        </>
      )}
    </div>
  );
}
export default RegisterForm;

async function registerUserFetch(userObj) {
  const resp = await fetch('https://reqres.in/api/register', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(userObj),
  });
  const responseInJs = await resp.json();
  console.log('responseInJs ===', responseInJs);
  return responseInJs;
}
