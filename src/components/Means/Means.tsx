import React from "react";
import './Means.scss';
import { useAppSelector } from "../../store/store";
import { TreeTableType } from "../../types/types";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";

const Means: React.FC = () => {
    const means = useAppSelector(s => s.dataSlice.means)
    console.log('means app', means)
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
            <TreeTable value={meansData} tableStyle={{ minWidth: '100%' }} scrollable scrollHeight="350px">
                <Column field="code" header="Code" expander style={{ minWidth: '200px' }}></Column>
                <Column field="name" header="Name" style={{ minWidth: '500px' }}></Column>
            </TreeTable>
        </section>
    )
}

export default Means;