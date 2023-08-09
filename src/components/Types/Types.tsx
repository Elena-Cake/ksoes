import React from "react";
import './Types.scss';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getTypes } from "../../store/vocabularySlice";

const Types: React.FC = () => {

    const dispatch = useAppDispatch()
    const types = useAppSelector(s => s.vocabularySlice.types)
    const typesElements = <select>
        {types.map(type => <option key={type.id}>{type.id} - {type.name}</option>)}
    </select>

    const handleGetTypes = () => {
        dispatch(getTypes())
    }

    return (
        <section className='types'>
            <h2 style={{ 'margin': "0" }}>types</h2>
            {/* <button onClick={() => handleGetTypes()}>types</button> */}
            <>{typesElements}</>
        </section>
    )
}

export default Types;