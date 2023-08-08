import React from "react";
import './Observatory.scss';
import { useAppSelector } from "../../store/store";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const Observatory: React.FC = () => {

    const observatory = useAppSelector(s => s.dataSlice.observatory)
    const observatoruDay = useAppSelector(s => s.dataSlice.observatoryDay)

    return (
        <section className='observatory'>
            <h2>observatory</h2>
            <div className='observatory_table'>
                <DataTable value={observatory} tableStyle={{ minWidth: '100%' }} scrollable scrollHeight="300px" >
                    <Column field="code" header="Code"></Column>
                    <Column field="name" header="Name"></Column>
                </DataTable>
            </div>
            <h2 >observatory stat_day</h2>
            <div className="observatory_table_type_day">

                <DataTable value={observatoruDay} tableStyle={{ minWidth: '100%' }} scrollable scrollHeight="200px" >
                    <Column field="count" header="Count"></Column>
                    <Column field="id_type" header="Id type"></Column>
                    <Column field="id_observatory" header="Id observatory"></Column>
                </DataTable>
            </div>
        </section>
    )
}

export default Observatory;