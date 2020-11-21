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

const useCriptomoneda = (label, stateInicial, opciones) => {

    /* console.log(opciones); */

    /* State de nuestro custom hook */
    const[ state, actualizarState ] = useState(stateInicial); 

    const SelectCripto = () => (
        <Fragment>
            <Label htmlFor="">{label}</Label>
            <Select 
              onChange= {e => actualizarState(e.target.value)}
               value={state}
            >
                <option value="">Seleccione</option>
                {opciones.map(opciones => (
                    <option key={opciones.CoinInfo.Id} value={opciones.CoinInfo.Name}>{opciones.CoinInfo.FullName}</option>
                ))} 
            </Select>
        </Fragment>
    );

    /* retornar state, intefaz y funcion que mod el state */
    
    return [state, SelectCripto, actualizarState];


}

export default useCriptomoneda;
