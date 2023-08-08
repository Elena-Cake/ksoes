import React from "react";
import './Observatory.scss';
import { useAppSelector } from "../../store/store";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const Observatory: React.FC = () => {

    const observatory = useAppSelector(s => s.dataSlice.observatory)

    return (
        <section className='observatory'>
            <h2>observatory</h2>
            <div className='observatory_table'>
                <DataTable value={observatory} tableStyle={{ minWidth: '100%' }} scrollable scrollHeight="300px" >
                    <Column field="code" header="Code"></Column>
                    <Column field="name" header="Name"></Column>
                </DataTable>
            </div>
        </section>
    )
}

export default Observatory;