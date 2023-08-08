import React, { useState } from "react";
import './Toast.scss';

type PropsType = {
    message: string
}

const Toast: React.FC<PropsType> = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true)

    const handleCloseToast = () => setIsVisible(false)
    return (
        <>
            {isVisible &&
                < div className="toast" >
                    <button onClick={() => handleCloseToast()}>x</button>
                    <p>{message}</p>
                </div >
            }
        </>
    )
}

export default Toast;