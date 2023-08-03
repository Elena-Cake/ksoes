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
                <Button icon="pi pi-times" label="Выйти" iconPos="right"
                    text raised
                    className="header__logout" onClick={() => { dispatch(logout()) }}
                    style={{ 'padding': '5px', 'color': '#fff' }}
                >
                </Button>
            }
        </header>
    )
}

export default Header;