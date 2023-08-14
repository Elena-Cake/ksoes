import React, { useState } from "react";
import './Header.scss';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logout } from "../../store/authSlice";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const Header: React.FC = () => {
    const userName = useAppSelector(s => s.auth.login)
    const isAuth = useAppSelector(s => s.auth.isAuth)
    const dispatch = useAppDispatch()

    return (
        <header className="header">
            <span className="header__name">{userName}</span>
            {isAuth &&
                <Button
                    type="text"
                    className="header__logout"
                    onClick={() => dispatch(logout())}
                >
                    Выйти
                    <CloseOutlined />
                </Button>
            }
        </header>
    )
}

export default Header;