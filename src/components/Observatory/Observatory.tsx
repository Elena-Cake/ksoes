import React from "react";
import './Observatory.scss';
import { useAppSelector } from "../../store/store";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const Observatory: React.FC = () => {

    const observatory = useAppSelector(s => s.dataSlice.observatory)

    return (
        <section className='observatory'>
            <button style={{ 'width': '100px', 'margin': '0 auto' }}>observatory</button>
            <div className='observatory_table'>
                <DataTable value={observatory} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="300px" >
                    <Column field="code" header="Code"></Column>
                    <Column field="name" header="Name"></Column>
                </DataTable>
            </div>
        </section>
    )
}

export default Observatory;