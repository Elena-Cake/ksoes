import React from "react";
import './Observatory.scss';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import FormDates from "../FormDates/FormDates";
import { getObservatoryByDay, getObservatoryByDays } from "../../store/dataSlice";

const Observatory: React.FC = () => {
    const dispatch = useAppDispatch()

    const types = useAppSelector(s => s.vocabularySlice.types)
    const observatory = useAppSelector(s => s.vocabularySlice.observatory)
    const observatoruDay = useAppSelector(s => s.dataSlice.observatoryDay)

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

    return (
        <section className='observatory'>
            <p>Получить отчет по обсерваториям </p>
            <FormDates apiError={null} onSend={getReport} />
            <div className="observatory_table_type_day">
                <DataTable value={dataTable} tableStyle={{ minWidth: '100%' }} scrollable scrollHeight="70vh" >
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