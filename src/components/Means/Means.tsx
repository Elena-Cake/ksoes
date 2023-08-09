import React from "react";
import './Means.scss';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import FormDates from "../FormDates/FormDates";
import { getMeansByDay, getMeansByDays } from "../../store/dataSlice";

const Means: React.FC = () => {
    const dispatch = useAppDispatch()
    const types = useAppSelector(s => s.vocabularySlice.types)
    // const observatory = useAppSelector(s => s.dataSlice.observatory)
    const means = useAppSelector(s => s.vocabularySlice.means)
    const meansDay = useAppSelector(s => s.dataSlice.meansDay)

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

    return (
        <section className='means'>
            <p>Получить отчет по средствам </p>
            <FormDates apiError={null} onSend={getReport} />
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