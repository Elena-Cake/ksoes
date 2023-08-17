import React, { useEffect, useRef, useState } from "react";
import './Observatory.scss';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getMeansByStatDay, getObservatoryByStatDay, getObservatoryByStatDaySender } from "../../store/dataSlice";
import { TIME_UPDATE_REPORT } from "../../constans/constans";
import { TreeTableType, TreeTableTypeMessages } from "../../types/types";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { checkNameType } from "../../utils/functions";

let intervalId: NodeJS.Timeout;

const Observatory: React.FC<{ isShow?: boolean }> = ({ isShow = false }) => {



    const dispatch = useAppDispatch()

    const dateReport = useAppSelector(s => s.dataSlice.dateReport)

    const types = useAppSelector(s => s.vocabularySlice.types)
    const observatory = useAppSelector(s => s.vocabularySlice.observatory)
    const means = useAppSelector(s => s.vocabularySlice.means)

    const observatoryDay = useAppSelector(s => s.dataSlice.observatoryDay)
    const meansDay = useAppSelector(s => s.dataSlice.meansDay)

    const observatoryDaySender = useAppSelector(s => s.dataSlice.observatoryReportSender)

    const typesFiltersValues = types.map(type => {
        return {
            text: type.name,
            value: type.name,
        }
    })

    // const [dataTableTree, setDataTableTree] = useState([] as TreeTableType[] )
    const [dataTableTree, setDataTableTree] = useState([] as TreeTableTypeMessages[])

    // const-s to api interval
    const isReportUpdate = useAppSelector(s => s.dataSlice.isStatReportObservatoryUpdate)
    const previsReportUpdateRef = useRef<boolean | null>(null);

    // setInterval and clean it
    function startSendingRequests() {
        intervalId = setInterval(() => {
            if (isReportUpdate) {
                dispatch(getObservatoryByStatDay())
                dispatch(getMeansByStatDay())
                dispatch(getObservatoryByStatDaySender())
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

    const stylesRow = isShow ? { 'fontSize': '25px' } : { 'margin': '4px 15px', 'fontSize': '18px' }

    // const columns: ColumnsType<TreeTableType> = [
    //     {
    //         title: "Название",
    //         dataIndex: "name",
    //         key: "name",
    //         render: (_, record) => {
    //             return (
    //                 <p style={{ ...stylesRow }}>{record.name}</p>
    //             )
    //         },
    //     },
    //     {
    //         title: "Тип Сообщения",
    //         dataIndex: "isSender",
    //         key: "isSender",
    //         render: (_, record) => {
    //             const text = record.isSender ? 'Исходящие' : 'Входящие'
    //             return (
    //                 <p style={{ ...stylesRow, 'color': `${text === 'Исходящие' ? '#02418a' : '#48028a'}` }}>{text}</p>
    //             )
    //         },
    //         filters: [{
    //             text: 'Входящие',
    //             value: false,
    //         },
    //         {
    //             text: 'Исходящие',
    //             value: true,
    //         }],
    //         onFilter: (value, record) => record.isSender === value

    //     },
    //     {
    //         title: "Тип",
    //         dataIndex: "type",
    //         key: "type",
    //         filters: typesFiltersValues,
    //         onFilter: (value, record) => record.type === value,
    //         render: (_, record) => {
    //             return (
    //                 <p style={{ ...stylesRow }}>{record.type}</p>
    //             )
    //         },
    //     },
    //     {
    //         title: "Количество",
    //         dataIndex: "count",
    //         key: "count",
    //         render: (_, record) => {
    //             return (
    //                 <p style={{ ...stylesRow }}>{record.count}</p>
    //             )
    //         },
    //     }

    // ];

    useEffect(() => {

        if (observatoryDay && observatoryDaySender) {
            // отдельные строки тип:кол-во
            // const dataTable: TreeTableType[] = observatoryDay.map((data, i) => {
            //     return {
            //         key: i,
            //         id: data.id_observatory,
            //         name: String(observatory[data.id_observatory]),
            //         type: checkNameType(types.find(type => type.id === data.id_type)?.name || 'Не найден'),
            //         count: data.count,
            //         isSender: false
            //     }
            // })
            // observatoryDaySender.forEach((data, i) => {
            //     let j = i + dataTable.length
            //     dataTable.push({
            //         key: j,
            //         id: data.id_observatory,
            //         name: String(observatory[data.id_observatory]),
            //         type: checkNameType(types.find(type => type.id === data.id_type)?.name || 'Не найден'),
            //         count: data.count,
            //         isSender: true
            //     })
            // })
            // meansDay.forEach(data => {
            //     const idObs = means.find(mean => mean.id_mean === String(data.id_mean))?.id_observatory
            //     const obsItem = dataTable.find(item => String(item.id) === idObs)
            //     if (obsItem) {
            //         const name = means.find(mean => mean.id_mean === String(data.id_mean))?.name_mean
            //         // @ts-ignore
            //         if (!obsItem.children) {
            //             // @ts-ignore
            //             obsItem.children = []
            //         }
            //         const j = obsItem.children.length

            //         // @ts-ignore
            //         obsItem.children.push({
            //             key: obsItem.key + '-' + j,
            //             id_mean: data.id_mean,
            //             name: name?.slice(name?.indexOf(' ')),
            //             type: checkNameType(types.find(type => type.id === data.id_type)?.name || 'Не найден'),
            //             count: data.count,
            //             isSender: false
            //         })
            //     }
            // })

            // по типам сообщенй
            const dataTable: TreeTableTypeMessages[] = observatoryDay.map((data, i) => {
                return {
                    key: i,
                    id: data.id_observatory,
                    name: String(observatory[data.id_observatory]),
                    typeResiv: checkNameType(types.find(type => type.id === data.id_type)?.name || 'Не найден'),
                    countResiv: data.count,
                    typeSender: '',
                    countSender: undefined
                }
            })
            observatoryDaySender.forEach((data, i) => {
                const observatory = dataTable.find(item => item.id === data.id_observatory)
                if (observatory) {
                    observatory.typeSender = checkNameType(types.find(type => type.id === data.id_type)?.name || 'Не найден')
                    observatory.countSender = data.count
                } else {
                    let j = i + dataTable.length
                    dataTable.push({
                        key: j,
                        id: data.id_observatory,
                        // @ts-ignore
                        name: String(observatory[data.id_observatory]),
                        typeResiv: '',
                        countResiv: undefined,
                        typeSender: checkNameType(types.find(type => type.id === data.id_type)?.name || 'Не найден'),
                        countSender: data.count
                    })
                }
            })

            // @ts-ignore
            dataTable.sort((a, b) => a.id - b.id)

            // @ts-ignore
            setDataTableTree([...dataTable])
        }
    }, [observatoryDay, observatoryDaySender])

    const columns: ColumnsType<TreeTableTypeMessages> = [
        {
            title: "Название",
            dataIndex: "name",
            key: "name",
            // rowScope: 'rowgroup'
        },
        {
            title: "Входящие",
            children: [
                {
                    title: "Тип",
                    dataIndex: "typeResiv",
                    key: "typeResiv",
                    // filters: typesFiltersValues,
                    // onFilter: (value, record) => record.type === value
                },
                {
                    title: "Количество",
                    dataIndex: "countResiv",
                    key: "countResiv"
                }
            ]
        },
        {
            title: "Исходящие",
            children: [
                {
                    title: "Тип",
                    dataIndex: "typeSender",
                    key: "typeSender",
                    // filters: typesFiltersValues,
                    // onFilter: (value, record) => record.type === value
                },
                {
                    title: "Количество",
                    dataIndex: "countSender",
                    key: "countSender"
                }
            ]
        }
    ];


    useEffect(() => () => stopSendingRequests(), []);

    const rowHeadStyle = { style: { 'fontSize': `${isShow ? '25px' : '18px'}` } }

    return (
        <section className='observatory'>
            <p className="observatory__title">Oтчет по обсерваториям за {dateReport}</p>
            <div className="observatory_table_type_day" >
                <Table
                    size="small"
                    onHeaderRow={(record, index) => { return rowHeadStyle }}
                    columns={columns}
                    expandable={{
                        defaultExpandAllRows: true,
                        expandRowByClick: true
                    }}
                    dataSource={dataTableTree}
                    pagination={false}
                />
            </div>
        </section>
    )
}

export default Observatory;