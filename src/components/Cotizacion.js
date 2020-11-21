import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
    color:#ffffff;
    font-family: Arial, Helvetica, sans-serif;
    span{

        font-weight: bold;
    }

`;

const Info = styled.p`
    font-size: 18px;
`;

const Precio = styled.p`
    font-size: 30px;

    span{
        font-weight: bold;
    }
`;

const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).length === 0) return null;

    console.log(resultado);

    return(

        <ResultadoDiv>
            <Precio>El Precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>El Precio mas alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>El Precio mas bajo del día <span>{resultado.LOWDAY}</span></Info>
            <Info>Variacion las ultimas 24hs: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Última Actualizacion: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>

    );

}
 
export default Cotizacion;