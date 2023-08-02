import React from "react";
import { useNavigate } from "react-router-dom";

import './Login.scss';

// import * as yup from 'yup';
// import { loginMe } from "../../redux/authReduser";
import { useDispatch, useSelector } from "react-redux";
import { valuesType, LoginForm } from "./LoginForm";
import { RootState, TypedDispatch } from "../../store/store";

const Login: React.FC = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch<TypedDispatch>()

    const isAuth = useSelector((state: RootState) => state.auth.isAuth)

    const onSubmit = (values: valuesType) => {
        const { email, password, isRobot, captcha = null } = values
        const rememberMe = !isRobot
        // dispatch(loginMe(email, password, rememberMe, captcha))
    }
    if (isAuth) {
        // navigate("/profile")
    }
    return (
        <div className="popup__wrapper">
            <LoginForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login;
