import React from "react";
import './ShowObservatory.scss';
import Observatory from "../Observatory/Observatory";


const ShowObservatory: React.FC = () => {

    return (
        <>
            <Observatory isShow={true} />
        </>
    )
}

export default ShowObservatory;