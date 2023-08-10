import React, { useState } from "react";
import './Toast.scss';
import { Button } from "primereact/button";

type PropsType = {
    isVisible: boolean,
    closeToast: () => void,
    values: {
        isError: boolean,
        message: string
    }
}

const MyToast: React.FC<PropsType> = ({ isVisible, values, closeToast }) => {

    return (
        <>
            {isVisible &&
                < div className="toast" >
                    <div className={`toast__container ${values.isError && 'toast__container_type_error'}`}>
                        <Button className="toast__btn-close" icon="pi pi-times" rounded text severity={values.isError ? "danger" : 'success'} aria-label="Cancel" onClick={() => closeToast()} />
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

export default MyToast;