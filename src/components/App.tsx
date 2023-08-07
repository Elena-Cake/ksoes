import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login/Login';
import { useAppDispatch, useAppSelector } from '../store/store';
import { checkToken } from '../store/authSlice';
import Header from './Header/Header'; import "primereact/resources/themes/lara-light-indigo/theme.css";
import { getMeans, getObservatory, getTypes } from '../store/dataSlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import { TreeTableType } from '../types/types';

function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const types = useAppSelector(s => s.dataSlice.types)
  const typesElements = <select>
    {types.map(type => <option key={type.id}>{type.name}</option>)}
  </select>

  const observatory = useAppSelector(s => s.dataSlice.observatory)
  // const observatoryElements =

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


  // проверка токена
  useEffect(() => {
    dispatch(checkToken())
  }, [])

  useEffect(() => {
    if (isAuth) {
      dispatch(getTypes())
      dispatch(getObservatory())
      dispatch(getMeans())
    }
  }, [isAuth])

  const handleGetTypes = () => {
    dispatch(getTypes())
  }

  return (
    <div className="App">
      <Header />
      {!isAuth && <Login />}
      <div className='main'>
        <section className='types'>
          <button onClick={() => handleGetTypes()}>types</button>
          <>{typesElements}</>
        </section>
        <button style={{ 'width': '100px', 'margin': '0 auto' }}>observatory</button>
        <section className='observatory'>
          <DataTable value={observatory} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="300px" >
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
          </DataTable>
        </section>

        <section className='means'>
          <button >means</button>
          <TreeTable value={meansData} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="350px">
            <Column field="code" header="Code" expander style={{ minWidth: '100px' }}></Column>
            <Column field="name" header="Name" style={{ minWidth: '150px' }}></Column>
          </TreeTable>
        </section>
      </div>
    </div >
  );
}

export default App;
