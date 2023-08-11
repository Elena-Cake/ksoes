import React, { useEffect, useRef, useState } from "react";
import './Observatory.scss';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Column } from "primereact/column";
import { getMeansByStatDay, getObservatoryByStatDay } from "../../store/dataSlice";
import { OBJECT_EXTEND_ROWS, TIME_UPDATE_REPORT } from "../../constans/constans";
import { TreeTable, TreeTableExpandedKeysType } from "primereact/treetable";
import { TreeTableType } from "../../types/types";
import { TreeNode } from "primereact/treenode";

let intervalId: NodeJS.Timeout;

const Observatory: React.FC = () => {
    const dispatch = useAppDispatch()

    const dateReport = useAppSelector(s => s.dataSlice.dateReport)

    const types = useAppSelector(s => s.vocabularySlice.types)
    const observatory = useAppSelector(s => s.vocabularySlice.observatory)
    const means = useAppSelector(s => s.vocabularySlice.means)

    const observatoryDay = useAppSelector(s => s.dataSlice.observatoryDay)
    const meansDay = useAppSelector(s => s.dataSlice.meansDay)

    const [dataTableTree, setDataTableTree] = useState([] as TreeTableType[])
    const [expandedKeys, setExpandedKeys] = useState<TreeTableExpandedKeysType | undefined>(OBJECT_EXTEND_ROWS);
    // const-s to api interval
    const isReportUpdate = useAppSelector(s => s.dataSlice.isStatReportObservatoryUpdate)
    const previsReportUpdateRef = useRef<boolean | null>(null);

    // setInterval and clean it
    function startSendingRequests() {
        intervalId = setInterval(() => {
            if (isReportUpdate) {
                dispatch(getObservatoryByStatDay())
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

    useEffect(() => {
        if (observatoryDay) {
            const dataTable = observatoryDay.map((data, i) => {
                return {
                    key: i,
                    data: {
                        id: data.id_observatory,
                        name: observatory[data.id_observatory],
                        type: types.find(type => type.id === data.id_type)?.name,
                        count: data.count
                    },
                    children: [] as TreeTableType[]
                }
            })
            meansDay.forEach(data => {
                const idObs = means.find(mean => mean.id_mean === String(data.id_mean))?.id_observatory
                const obsItem = dataTable.find(item => String(item.data.id) === idObs)
                if (obsItem) {
                    const name = means.find(mean => mean.id_mean === String(data.id_mean))?.name_mean
                    // @ts-ignore
                    const j = obsItem.children.length
                    // @ts-ignore
                    obsItem.children.push({
                        key: obsItem.key + '-' + j,
                        data: {
                            id_mean: data.id_mean,
                            name: name?.slice(name?.indexOf(' ')),
                            type: types.find(type => type.id === data.id_type)?.name,
                            count: data.count
                        },
                    })
                }
            })

            setDataTableTree([...dataTable])
            setExpandedKeys(OBJECT_EXTEND_ROWS)
        }
    }, [observatoryDay])

    const rowClassName = (node: TreeNode) => {
        return { 'p-highlight': node.data.id_mean };
    }

    useEffect(() => () => stopSendingRequests(), []);

    return (
        <section className='observatory'>
            <p className="observatory__title">Oтчет по обсерваториям за {dateReport}</p>
            <div className="observatory_table_type_day" >
                <TreeTable
                    value={dataTableTree}
                    tableStyle={{ minWidth: '100%' }}
                    scrollable scrollHeight="70vh"
                    rowClassName={rowClassName}
                    expandedKeys={expandedKeys}
                >
                    <Column field="name" header="Наименование" expander style={{ minWidth: '30vw' }} ></Column>
                    <Column field="type" header="Тип информации" style={{ minWidth: '30vw' }}></Column>
                    <Column field="count" header="Количество" style={{ minWidth: '30vw' }}></Column>
                </TreeTable>
            </div>
        </section>
    )
}

export default Observatory;