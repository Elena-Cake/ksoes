import React, { useEffect, useRef } from 'react';
import './App.css';
import Login from './Login/Login';
import { useAppDispatch, useAppSelector } from '../store/store';
import { checkToken } from '../store/authSlice';
import Header from './Header/Header'; import "primereact/resources/themes/lara-light-indigo/theme.css";
import { getMeansByDay, getObservatoryByDay } from '../store/dataSlice';
import Means from './Means/Means';
import Observatory from './Observatory/Observatory';
import Spinner from './Spinner/Spinner';
import { Toast } from 'primereact/toast';
import { removeError } from '../store/appSlice';
import { getMeans, getObservatory, getTypes, setCatalogs } from '../store/vocabularySlice';

function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const isPending = useAppSelector(s => s.appSlice.isPending)

  const toast = useRef<Toast>(null);
  const error = useAppSelector(s => s.appSlice.error)

  useEffect(() => {
    if (error) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error, life: 5000 });
      dispatch(removeError())
    }
  }, [error])

  // проверка токена
  useEffect(() => {
    dispatch(checkToken())
  }, [])

  useEffect(() => {
    if (isAuth) {
      if (localStorage.getItem('catalogTypes')) {
        dispatch(setCatalogs())
      } else {
        dispatch(getTypes())
        dispatch(getObservatory())
        dispatch(getMeans())
      }
      dispatch(getObservatoryByDay())
      dispatch(getMeansByDay())
    }
  }, [isAuth])


  return (
    <div className="App">
      <Toast ref={toast} />
      {isPending &&
        <Spinner />
      }
      <Header />
      {!isAuth && <Login />}
      {isAuth &&
        <div className='main'>
          <Observatory />
          <Means />
        </div>
      }
    </div >
  );
}

export default App;
