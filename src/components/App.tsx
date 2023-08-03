import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login/Login';
import { useAppDispatch, useAppSelector } from '../store/store';
import { checkToken } from '../store/authSlice';
import Header from './Header/Header'; import "primereact/resources/themes/lara-light-indigo/theme.css";

function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  // проверка токена
  useEffect(() => {
    dispatch(checkToken())
  }, [])


  return (
    <div className="App">
      <Header />
      {!isAuth && <Login />}

    </div>
  );
}

export default App;
