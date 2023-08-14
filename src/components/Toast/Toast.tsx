import React, { useState } from "react";
import './Toast.scss';
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

type PropsType = {
    isVisible: boolean,
    closeToast: () => void,
    values: {
        isError: boolean,
        message: string
    }
}

const Toast: React.FC<PropsType> = ({ isVisible, values, closeToast }) => {

    return (
        <>
            {isVisible &&
                < div className="toast" >
                    <div className={`toast__container ${values.isError && 'toast__container_type_error'}`}>
                        <Button
                            type="text" shape="circle" icon={<CloseOutlined style={{ 'color': `${values.isError ? 'red' : 'green'}` }} />}
                            className="toast__btn-close"
                            onClick={() => closeToast()}
                        />
                        <>
                            <p className={`toast__title ${values.isError && 'toast__text_type_error'}`}>{values.isError ? 'Error' : 'Success'}</p>
                        </>
                        <p className={`toast__text ${values.isError && 'toast__text_type_error'}`}>{values.message}</p>
                    </div>
                </div >
            }
        </>
    )
}

export default Toast;