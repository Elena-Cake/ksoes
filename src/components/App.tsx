import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login/Login';
import { useAppDispatch, useAppSelector } from '../store/store';
import { checkToken } from '../store/authSlice';

function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  // проверка токена
  useEffect(() => {
    dispatch(checkToken())
  }, [])


  return (
    <div className="App">
      {!isAuth && <Login />}
    </div>
  );
}

export default App;
