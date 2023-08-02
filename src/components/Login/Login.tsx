import React from "react";
import { useNavigate } from "react-router-dom";

import './Login.scss';

// import * as yup from 'yup';
// import { loginMe } from "../../redux/authReduser";
import { useDispatch, useSelector } from "react-redux";
import { valuesType, LoginForm } from "./LoginForm";
import { RootState, TypedDispatch } from "../../store/store";
import { login, setUserName } from "../../store/authSlice";

const Login: React.FC = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch<TypedDispatch>()

    const isAuth = useSelector((state: RootState) => state.auth.isAuth)

    const onSubmit = (values: valuesType) => {
        const { username, password } = values
        dispatch(login({ username: username, password: password }))
        dispatch(setUserName({ userName: username }))
    }
    if (isAuth) {
        // navigate("/profile")
    }
    return (
        <div className="popup__wrapper ">
            <LoginForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login;
