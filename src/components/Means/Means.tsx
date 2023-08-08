import React from "react";
import './Means.scss';
import { useAppSelector } from "../../store/store";
import { TreeTableType } from "../../types/types";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const Means: React.FC = () => {
    const means = useAppSelector(s => s.dataSlice.means)
    const meansDay = useAppSelector(s => s.dataSlice.meansDay)

    const meansKeys = Object.keys(means)
    const meansData = [] as TreeTableType[]

    // формирование данных для TreeTable
    meansKeys.forEach((key, mainId) => {
        // @ts-ignore
        const keysInstruments = Object.keys(means[key])
        if (keysInstruments.length > 1) {
            const childrens = [] as TreeTableType[]
            keysInstruments.forEach((instrument, instrId) => {
                childrens.push({
                    key: instrId,
                    // @ts-ignore
                    label: means[key][instrument],
                    data: {
                        code: key,
                        // @ts-ignore
                        name: means[key][instrument]
                    },
                    icon: 'pi pi-fw pi-file'
                })
            })
            meansData.push({
                key: mainId,
                label: key,
                data: {
                    code: `${key} (${keysInstruments.length})`
                },
                icon: 'pi pi-fw pi-inbox',
                children: [...childrens]
            })
        } else {
            meansData.push({
                key: mainId,
                label: key,
                data: {
                    code: key,
                    // @ts-ignore
                    name: means[key][key]
                },
                icon: 'pi pi-fw pi-inbox'
            })
        }
    })


    return (
        <section className='means'>
            <h2 >means</h2>
            <TreeTable value={meansData} tableStyle={{ minWidth: '100%' }} scrollable scrollHeight="300px">
                <Column field="code" header="Code" expander style={{ minWidth: '200px' }}></Column>
                <Column field="name" header="Name" style={{ minWidth: '500px' }}></Column>
            </TreeTable>

            <h2 >means stat_day</h2>
            <div className="means_table_type_day">
                <DataTable value={meansDay} tableStyle={{ minWidth: '100%' }} scrollable scrollHeight="200px" >
                    <Column field="count" header="Count"></Column>
                    <Column field="id_type" header="Id type"></Column>
                    <Column field="id_mean" header="Id mean"></Column>
                </DataTable>
            </div>
        </section>
    )
}

export default Means;