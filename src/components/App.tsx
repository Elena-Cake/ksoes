import { useEffect, useState } from 'react';
import './App.css';
import Login from './Login/Login';
import { useAppDispatch, useAppSelector } from '../store/store';
import { checkToken, removeSuccsessMessageAuth } from '../store/authSlice';
import Header from './Header/Header';
import { getMeansByStatDay, getObservatoryByStatDay, removeSuccsessMessageData } from '../store/dataSlice';
// import Means from './Means/Means';
import Spinner from './Spinner/Spinner';
import { removeError } from '../store/appSlice';
import { getMeans, getObservatory, getTypes, setCatalogs } from '../store/vocabularySlice';
import { Route, Routes } from 'react-router-dom';
import ShowObservatory from './ShowObservatory/ShowObservatory';
import GetReportsObservatory from './GetReportsObservatory/GetReportsObservatory';
import Toast from './Toast/Toast';

function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const isPending = useAppSelector(s => s.appSlice.isPending)

  // const toast = useRef<Toast>(null);
  const AppError = useAppSelector(s => s.appSlice.error)
  const VocError = useAppSelector(s => s.vocabularySlice.error)
  const DataError = useAppSelector(s => s.dataSlice.error)

  const AuthMessageOk = useAppSelector(s => s.auth.succsess)
  const DataMessageOk = useAppSelector(s => s.dataSlice.succsess)

  // toast
  const [isVisibleToast, setIsVisibleToast] = useState(false)
  const [toastSettings, setToastSettings] = useState({ isError: true, message: '' })

  const closeToast = () => {
    setIsVisibleToast(false)
  }

  const showToastSuccsess = (message: string, typeSlice: 'app' | 'vocabulary' | 'data' | 'auth') => {
    setIsVisibleToast(true)
    setToastSettings({ isError: false, message: message })
    setTimeout(() => {
      setIsVisibleToast(false)
      if (typeSlice === 'auth') dispatch(removeSuccsessMessageAuth())
      if (typeSlice === 'data') dispatch(removeSuccsessMessageData())
    }, 3000)
  }

  useEffect(() => {
    if (AuthMessageOk || DataMessageOk) {
      if (AuthMessageOk) showToastSuccsess(AuthMessageOk, 'auth')
      if (DataMessageOk) showToastSuccsess(DataMessageOk, 'data')
    }
  }, [AuthMessageOk, DataMessageOk])

  const showToastError = (message: string, typeSlice: 'app' | 'vocabulary' | 'data') => {
    setIsVisibleToast(true)
    setToastSettings({ isError: true, message: message })
    setTimeout(() => {
      setIsVisibleToast(false)
      if (typeSlice === 'app') dispatch(removeError())
      if (typeSlice === 'data') dispatch(removeSuccsessMessageData())
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
      < Toast isVisible={isVisibleToast} values={toastSettings} closeToast={closeToast} />
      {isPending &&
        <Spinner />
      }
      <Header />
      {!isAuth && <Login />}
      {
        isAuth &&
        <div className='main'>
          <Routes>
            <Route path="/reports/" element={<GetReportsObservatory />} />
            <Route path="*" element={<ShowObservatory />} />
          </Routes>
        </div>
      }
    </div >
  );
}

export default App;
