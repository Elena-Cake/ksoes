import React, { useState } from "react";
import './FormDates.scss';
import { Button } from 'primereact/button';
import { errorTexts } from "../../constans/errors";

type PropsType = {
    onSend: (date_start: string, date_end?: string) => void,
    apiError: string | null,
    onAskStatReport: () => void
}

const FormDates: React.FC<PropsType> = ({ onSend, apiError, onAskStatReport }) => {
    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');

    const [error, setError] = useState(null as string | null)

    const isDateInFuture = (date: Date) => {
        const now = new Date()
        return date > now
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        if (dateStart !== '' && dateEnd !== '') {
            const start = new Date(dateStart)
            const end = new Date(dateEnd)
            if (isDateInFuture(start)) {
                setError(errorTexts.dates.ERROR_DATE_INTERVAL)
                return
            }
            if (start < end) {
                onSend(dateStart, dateEnd)
            } else {
                setError(errorTexts.dates.ERROR_DATE_INTERVAL)
            }
        } else if (dateStart !== '' || dateEnd !== '') {
            const date = dateStart !== '' ? dateStart : dateEnd
            if (isDateInFuture(new Date(date))) {
                setError(errorTexts.dates.ERROR_DATE)
                return
            }
            onSend(date)
        } else {
            setError(errorTexts.dates.ERROR_DATES_EMPTY)
        }

    }

    return (
        <div className="intervaldate">
            <form className="inputs__interval" onSubmit={(e) => handleSubmit(e)}>
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

                <Button label="Получить" outlined style={{ 'padding': '5px 15px' }} severity="info" />
            </form>
            <span className={`inputs__error ${error && "inputs__error_visible"}`}>{error}</span>
            <Button label="Получить отчет за сегодня"
                outlined style={{ 'padding': '5px 15px', 'minWidth': '250px' }} severity="info"
                onClick={() => onAskStatReport()} />
        </div>
    )
}

export default FormDates;