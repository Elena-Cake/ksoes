import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login/Login';

function App() {


  // const jwt = localStorage.getItem('jwt');
  // // проверка токена
  // useEffect(() => {
  //   if (jwt) {
  //     getProfile()
  //       .then((res) => {
  //         if (res) {
  //           setIsSignIn(true);
  //           pullInitialData();
  //           navigate({ replace: false })
  //         }
  //       })
  //       .catch((err) => {
  //         setIsSignIn(false);
  //         navigate("/", { replace: false })
  //       })
  //   }
  // }, [])
  // // удаление токена при выходе из аккаунта
  // function logOut(e) {
  //   e.preventDefault();
  //   setIsSignIn(false);
  //   localStorage.clear();
  //   setSavedMovies([]);
  //   setAllMovies([]);
  //   navigate("/", { replace: false });
  // }
  // // авторизация
  // function onSubmitLogin(dataForm) {
  //   setIsPreloaderActive(true)
  //   setInfoToolText('')
  //   const { email, password } = dataForm
  //   login({ password, email })
  //     .then((data) => {
  //       localStorage.setItem("jwt", data.token);
  //       setIsSignIn(true);
  //       navigate('/movies', { replace: true });
  //       openSucsessInfoTooltip();
  //       pullInitialData()
  //     })
  //     .catch((res) => {
  //       if (res === 400) {
  //         setTextErrorAuth(NO_VALIDATE.VALIDATION)
  //       } else if (res === 401) {
  //         setTextErrorAuth(UNAUTHORIZED.MESSAGE_AUTH)
  //       } else if (res === 409) {
  //         setTextErrorAuth(CONFLICT.MESSAGE)
  //       } else {
  //         appointErrorSubmit()
  //       }
  //       setIsSignIn(false)
  //     })
  //     .finally(() => setIsPreloaderActive(false))
  // }


  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
