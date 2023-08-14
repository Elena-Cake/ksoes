import React, { useState } from "react";
import './Spinner.scss';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logout } from "../../store/authSlice";

const Spinner: React.FC = () => {

    return (
        <div className='app__overflow'>
            <svg className="spinner" viewBox="0 0 50 50">
                <circle className="circle" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
        </div>
    )
}

export default Spinner;