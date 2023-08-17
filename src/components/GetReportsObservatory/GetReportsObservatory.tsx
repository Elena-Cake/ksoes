import React from "react";
import './GetReportsObservatory.scss';
import { useAppDispatch } from "../../store/store";
import FormDates from "../FormDates/FormDates";
import { getMeansByDay, getMeansByDays, getMeansByStatDay, getObservatoryByDay, getObservatoryByDaySender, getObservatoryByDays, getObservatoryByDaysSender, getObservatoryByStatDay } from "../../store/dataSlice";
import Observatory from "../Observatory/Observatory";
import Types from "../Types/Types";


const GetReportsObservatory: React.FC = () => {

    const dispatch = useAppDispatch()

    const getReport = (date_start: string, date_end?: string) => {
        if (date_end) {
            dispatch(getObservatoryByDays({ date_start, date_end }))
            dispatch(getMeansByDays({ date_start, date_end }))
            dispatch(getObservatoryByDaysSender({ date_start, date_end }))
        } else {
            dispatch(getObservatoryByDay({ date_start }))
            dispatch(getMeansByDay({ date_start }))
            dispatch(getObservatoryByDaySender({ date_start }))
        }
    }

    const onAskStatReport = () => {
        dispatch(getObservatoryByStatDay())
        dispatch(getMeansByStatDay())
    }

    return (
        <div className='getreports'>
            <div className="getreports__form">
                <p className="getreports__title">Получить отчет по обсерваториям </p>
                <FormDates apiError={null} onSend={getReport} onAskStatReport={onAskStatReport} />
            </div>
            <Observatory />
        </div>
    )
}

export default GetReportsObservatory;