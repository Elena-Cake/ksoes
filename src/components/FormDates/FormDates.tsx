import React, { useState } from "react";
import './FormDates.scss';
import { Button } from 'primereact/button';

type PropsType = {
    onSend: (date_start: string, date_end: string) => void,
    error: string | null
}

const FormDates: React.FC<PropsType> = ({ onSend, error }) => {
    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');


    return (
        <div className="intervaldate">
            <div className="inputs__interval">
                <p className="inputs__text">от</p>
                <input
                    className="inputs__date"
                    type="date"
                    name="date_start"
                    onChange={(e) => setDateStart(e.target.value)}
                    value={dateStart || ''} />
                <p className="inputs__text">до</p>
                <input
                    className="inputs__date"
                    type="date"
                    name="date_end"
                    onChange={(e) => setDateEnd(e.target.value)}
                    value={dateEnd || ''} />

                <Button label="Send" outlined style={{ 'padding': '5px 15px' }} severity="info" />
            </div>
            <span className={`inputs__error ${error && "inputs__error_visible"}`}>{error}</span>
        </div>
    )
}

export default FormDates;