import React from "react";
import './Means.scss';
import { useAppSelector } from "../../store/store";
import { TreeTableType } from "../../types/types";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import FormDates from "../FormDates/FormDates";

const Means: React.FC = () => {

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

    return (
        <section className='means'>
            <p>Получить отчет по средствам </p>
            <FormDates error={null} onSend={() => { }} />
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