import React, { useEffect, useRef, useState } from "react";
import './Observatory.scss';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import FormDates from "../FormDates/FormDates";
import { getMeansByDay, getMeansByDays, getMeansByStatDay, getObservatoryByDay, getObservatoryByDays, getObservatoryByStatDay } from "../../store/dataSlice";
import { OBJECT_EXTEND_ROWS, TIME_UPDATE_REPORT } from "../../constans/constans";
import { TreeTable, TreeTableExpandedKeysType } from "primereact/treetable";
import { TreeTableType } from "../../types/types";
import { TreeNode } from "primereact/treenode";
import { TreeExpandedKeysType } from "primereact/tree";

let intervalId: NodeJS.Timeout;

const Observatory: React.FC = () => {
    const dispatch = useAppDispatch()

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
        }, TIME_UPDATE_REPORT);// 1 min
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

    const getReport = (date_start: string, date_end?: string) => {
        if (date_end) {
            dispatch(getObservatoryByDays({ date_start, date_end }))
            dispatch(getMeansByDays({ date_start, date_end }))
        } else {
            dispatch(getObservatoryByDay({ date_start }))
            dispatch(getMeansByDay({ date_start }))
        }
    }

    const onAskStatReport = () => {
        dispatch(getObservatoryByStatDay())
        dispatch(getMeansByStatDay())
    }

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

            setDataTableTree(dataTable)
        }
    }, [observatoryDay])

    const rowClassName = (node: TreeNode) => {
        return { 'p-highlight': node.data.id_mean };
    }

    // const getExpandedNodes = () => {
    //     let obj = {}

    //     observatoryDay.forEach((item, i) => {
    //         // @ts-ignore
    //         obj[i] = true
    //     })
    //     console.log(obj)
    //     return obj
    // }

    return (
        <section className='observatory'>
            <p className="observatory__title">Получить отчет по обсерваториям </p>
            <FormDates apiError={null} onSend={getReport} onAskStatReport={onAskStatReport} />
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
                    <Column field="count" header="Количество пакетов" style={{ minWidth: '30vw' }}></Column>
                </TreeTable>
            </div>
        </section>
    )
}

export default Observatory;