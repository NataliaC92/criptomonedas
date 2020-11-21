import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';



const Label = styled.label`
    font-family:'Beba Neue', cursive;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width:100%;
    display:block;
    padding: 1rem;
    --webkit-appearance: none;
    border-radius: 10px;
    border:none;
    font-size: 1.2rem;
`;

const useMoneda = (label, stateInicial, opciones) => {

    /* State de nuestro custom hook */
    const[ state, actualizarState ] = useState(stateInicial); 

    const Seleccionar = () => (
        <Fragment>
            <Label htmlFor="">{label}</Label>
            <Select 
               onChange= {e => actualizarState(e.target.value)}
               value={state}
            >
                <option value="">Seleccione</option>
                {opciones.map(opciones => (
                    <option key={opciones.codigo} value={opciones.codigo}>{opciones.nombre}</option>
                ))}
            </Select>
        </Fragment>
    );

    /* retornar state, intefaz y funcion que mod el state */
    
    return [state, Seleccionar, actualizarState];


}

export default useMoneda;

