import React, { useEffect, useRef } from "react";
import './Means.scss';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import FormDates from "../FormDates/FormDates";
import { getMeansByDay, getMeansByDays, getMeansByStatDay } from "../../store/dataSlice";
import { TIME_UPDATE_REPORT } from "../../constans/constans";

let intervalId: NodeJS.Timeout;

const Means: React.FC = () => {
    const dispatch = useAppDispatch()
    const types = useAppSelector(s => s.vocabularySlice.types)
    // const observatory = useAppSelector(s => s.dataSlice.observatory)
    const means = useAppSelector(s => s.vocabularySlice.means)
    const meansDay = useAppSelector(s => s.dataSlice.meansDay)


    // const-s to api interval
    const isReportUpdate = useAppSelector(s => s.dataSlice.isStatReportMeansUpdate)
    const previsReportUpdateRef = useRef<boolean | null>(null);

    // setInterval and clean it
    function startSendingRequests() {
        intervalId = setInterval(() => {
            if (isReportUpdate) {
                dispatch(getMeansByStatDay())
            } else {
                stopSendingRequests();
            }
        }, TIME_UPDATE_REPORT);
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

    const dataTable = meansDay.map(data => {
        const name = means.find(mean => mean.id_mean === String(data.id_mean))?.name_mean
        return {
            name_observatory: means.find(mean => mean.id_mean === String(data.id_mean))?.id_observatory,
            id_mean: data.id_mean,
            name: name?.slice(name?.indexOf(' ')),
            type: types.find(type => type.id === data.id_type)?.name,
            count: data.count

        }
    })

    const getReport = (date_start: string, date_end?: string) => {
        if (date_end) {
            dispatch(getMeansByDays({ date_start, date_end }))
        } else {
            dispatch(getMeansByDay({ date_start }))
        }
    }

    const onAskStatReport = () => {
        dispatch(getMeansByStatDay())
    }

    return (
        <section className='means'>
            <p className="means__title">Получить отчет по средствам </p>
            <FormDates apiError={null} onSend={getReport} onAskStatReport={onAskStatReport} />
            <div className="means_table_type_day">
                <DataTable value={dataTable} tableStyle={{ minWidth: '100%' }} scrollable scrollHeight="70vh" >
                    <Column field="name_observatory" header="Observatory"></Column>
                    <Column field="id_mean" header="Id mean"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="type" header="Type"></Column>
                    <Column field="count" header="Count"></Column>
                </DataTable>
            </div>
        </section>
    )
}

export default Means;