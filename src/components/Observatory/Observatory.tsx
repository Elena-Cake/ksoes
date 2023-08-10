import React, { useEffect, useRef, useState } from "react";
import './Observatory.scss';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import FormDates from "../FormDates/FormDates";
import { getObservatoryByDay, getObservatoryByDays, getObservatoryByStatDay } from "../../store/dataSlice";

let intervalId: NodeJS.Timeout;

const Observatory: React.FC = () => {
    const dispatch = useAppDispatch()

    const types = useAppSelector(s => s.vocabularySlice.types)
    const observatory = useAppSelector(s => s.vocabularySlice.observatory)
    const observatoruDay = useAppSelector(s => s.dataSlice.observatoryDay)

    // const-s to api interval
    const isReportUpdate = useAppSelector(s => s.dataSlice.isStatReportObservatoryUpdate)
    const previsReportUpdateRef = useRef<boolean | null>(null);

    // setInterval and clean it
    function startSendingRequests() {
        intervalId = setInterval(() => {
            if (isReportUpdate) {
                dispatch(getObservatoryByStatDay())
            } else {
                stopSendingRequests();
            }
        }, 60000 * 10);// 1 min
    }
    function stopSendingRequests() {
        clearInterval(intervalId);
    }
    // check Update
    useEffect(() => {
        if (isReportUpdate && isReportUpdate !== previsReportUpdateRef.current) {
            startSendingRequests();
        } else if (!isReportUpdate) {
            stopSendingRequests();
        }
    }, [isReportUpdate])
    // get previos isReportUpdate
    useEffect(() => {
        previsReportUpdateRef.current = isReportUpdate
    }, [isReportUpdate])


    const dataTable = observatoruDay.map(data => {

        return {
            id: data.id_observatory,
            name: observatory[data.id_observatory],
            type: types.find(type => type.id === data.id_type)?.name,
            count: data.count
        }
    })

    const getReport = (date_start: string, date_end?: string) => {
        if (date_end) {
            dispatch(getObservatoryByDays({ date_start, date_end }))
        } else {
            dispatch(getObservatoryByDay({ date_start }))
        }
    }

    const onAskStatReport = () => {
        dispatch(getObservatoryByStatDay())
    }

    return (
        <section className='observatory'>
            <p className="observatory__title">Получить отчет по обсерваториям </p>
            <FormDates apiError={null} onSend={getReport} onAskStatReport={onAskStatReport} />
            <div className="observatory_table_type_day">
                <DataTable value={dataTable} tableStyle={{ minWidth: '100%' }} scrollable scrollHeight="800px">
                    <Column field="id" header="Id Observatory"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="type" header="Type"></Column>
                    <Column field="count" header="Count"></Column>
                </DataTable>
            </div>
        </section>
    )
}

export default Observatory;