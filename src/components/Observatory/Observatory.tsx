import React from "react";
import './Observatory.scss';
import { useAppSelector } from "../../store/store";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import FormDates from "../FormDates/FormDates";

const Observatory: React.FC = () => {
    const types = useAppSelector(s => s.dataSlice.types)
    const observatory = useAppSelector(s => s.dataSlice.observatory)
    const observatoruDay = useAppSelector(s => s.dataSlice.observatoryDay)

    const dataTable = observatoruDay.map(data => {

        return {
            id: data.id_observatory,
            name: observatory[data.id_observatory],
            type: types.find(type => type.id === data.id_type)?.name,
            count: data.count
        }
    })

    return (
        <section className='observatory'>
            <h2 >observatory stat_day</h2>
            <FormDates />
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