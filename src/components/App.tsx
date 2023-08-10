import { useEffect, useState } from 'react';
import './App.css';
import Login from './Login/Login';
import { useAppDispatch, useAppSelector } from '../store/store';
import { checkToken, removeSuccsess } from '../store/authSlice';
import Header from './Header/Header';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { getMeansByStatDay, getObservatoryByStatDay, removeDataError } from '../store/dataSlice';
import Means from './Means/Means';
import Observatory from './Observatory/Observatory';
import Spinner from './Spinner/Spinner';
import { Toast } from 'primereact/toast';
import { removeError, setNetworkError } from '../store/appSlice';
import { getMeans, getObservatory, getTypes, removeVocError, setCatalogs } from '../store/vocabularySlice';
import MyToast from './Toast/Toast';

function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const isPending = useAppSelector(s => s.appSlice.isPending)

  // const toast = useRef<Toast>(null);
  const AppError = useAppSelector(s => s.appSlice.error)
  const VocError = useAppSelector(s => s.vocabularySlice.error)
  const DataError = useAppSelector(s => s.dataSlice.error)

  const AuthOk = useAppSelector(s => s.auth.succsess)

  // toast
  const [isVisibleToast, setIsVisibleToast] = useState(false)
  const [toastSettings, setToastSettings] = useState({ isError: true, message: '' })

  const closeToast = () => {
    setIsVisibleToast(false)
  }

  const showToastSuccsess = (message: string) => {
    setIsVisibleToast(true)
    setToastSettings({ isError: false, message: message })
    setTimeout(() => {
      setIsVisibleToast(false)
      dispatch(removeSuccsess())
    }, 3000)
  }

  useEffect(() => {
    if (AuthOk) {
      showToastSuccsess(AuthOk)
    }
  }, [AuthOk])

  const showToastError = (message: string, typeError: 'app' | 'vocabulary' | 'data') => {
    setIsVisibleToast(true)
    setToastSettings({ isError: true, message: message })
    setTimeout(() => {
      setIsVisibleToast(false)
      if (typeError === 'app') dispatch(removeError())
      if (typeError === 'data') dispatch(removeDataError())
      if (typeError === 'vocabulary') dispatch(removeVocError())
    }, 3000)
  }

  useEffect(() => {
    if (AppError || VocError || DataError) {
      if (AppError) showToastError(AppError, 'app')
      if (VocError) showToastError(VocError, 'vocabulary')
      if (DataError) showToastError(DataError, 'data')
    }
  }, [AppError, VocError, DataError])

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
      dispatch(getObservatoryByStatDay())
      dispatch(getMeansByStatDay())
    }
  }, [isAuth])



  return (
    <div className="App">
      {/* <button onClick={() => dispatch(setNetworkError())}>x</button> */}
      {/* <Toast ref={toast} /> */}
      < MyToast isVisible={isVisibleToast} values={toastSettings} closeToast={closeToast} />
      {isPending &&
        <Spinner />
      }
      <Header />
      {!isAuth && <Login />}
      {
        isAuth &&
        <div className='main'>
          <Observatory />
          <Means />
        </div>
      }
    </div >
  );
}

export default App;
