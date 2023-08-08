import React from "react";
import './Types.scss';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getTypes } from "../../store/dataSlice";

const Types: React.FC = () => {

    const dispatch = useAppDispatch()
    const types = useAppSelector(s => s.dataSlice.types)
    const typesElements = <select>
        {types.map(type => <option key={type.id}>{type.name}</option>)}
    </select>

    const handleGetTypes = () => {
        dispatch(getTypes())
    }

    return (
        <section className='types'>
            <button onClick={() => handleGetTypes()}>types</button>
            <>{typesElements}</>
        </section>
    )
}

export default Types;