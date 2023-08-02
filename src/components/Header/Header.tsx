import React, { useState } from "react";
import './Header.scss';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button } from 'primereact/button';
import { logout } from "../../store/authSlice";

const Header: React.FC = () => {
    const userName = useAppSelector(s => s.auth.login)
    const isAuth = useAppSelector(s => s.auth.isAuth)
    const dispatch = useAppDispatch()

    return (
        <header className="header">
            <span className="header__name">{userName}</span>
            {isAuth &&
                <Button icon="pi pi-times" outlined severity="danger" label="Выйти"
                    className="header__logout" onClick={() => { dispatch(logout()) }} />
            }
        </header>
    )
}

export default Header;