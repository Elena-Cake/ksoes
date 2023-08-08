import React, { useEffect } from 'react';
import './App.css';
import Login from './Login/Login';
import { useAppDispatch, useAppSelector } from '../store/store';
import { checkToken } from '../store/authSlice';
import Header from './Header/Header'; import "primereact/resources/themes/lara-light-indigo/theme.css";
import { getMeans, getMeansByDay, getObservatory, getObservatoryByDay, getTypes } from '../store/dataSlice';
import Means from './Means/Means';
import Observatory from './Observatory/Observatory';
import Types from './Types/Types';

function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)

  // проверка токена
  useEffect(() => {
    dispatch(checkToken())
  }, [])

  useEffect(() => {
    if (isAuth) {
      dispatch(getTypes())

      dispatch(getObservatory())
      dispatch(getObservatoryByDay())

      dispatch(getMeans())
      dispatch(getMeansByDay())
    }
  }, [isAuth])

  return (
    <div className="App">
      <Header />
      {!isAuth && <Login />}
      {isAuth &&
        <div className='main'>
          <Types />
          <Observatory />
          <Means />
        </div>
      }
    </div >
  );
}

export default App;
