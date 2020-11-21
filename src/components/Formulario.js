import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Error from './Error'
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top:20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color:#ffffff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor:pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    /* state del listado de criptomoneda*/

    const [ listaCripto, guardarCriptomonedas ] = useState([]);
    const [ error, guardarError ] = useState(false);


    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libra Esterlina'},
        { codigo: 'ARS', nombre: 'Peso Argentino'}
    ]

    /* Utilizar useMoneda - extraer quellos que utilizare,ps*/
    const [ moneda, SelectMoneda ] = useMoneda('Elige tu Moneda', '', MONEDAS);

    /* utilizar useCriptomoneda */

    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elide tu moneda', '', listaCripto);

    /* ejecutar llamado a la API */
    useEffect(() => {
        
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }

        consultarAPI();
    }, []);

    /* Definir la accion a seguir cuando el usuario hace click en el form  */
    const cotizarMoneda = e => {
        e.preventDefault();

        /* validar si ambos campos estan llenos */
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }
        
        /* pasar los datos al componente principal*/
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);

    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >

        {error ? 
            <Error
                mensaje='Completar todos los Campos'
            />
        
        : null}

        <SelectMoneda />

        <SelectCripto />

        <Boton
            type="submit"
            value="Calcular"
        />
        </form>
     );
}
Formulario.prototype = {
    guardarMoneda: PropTypes.func.isRequired,
    guardarCriptomoneda: PropTypes.func.isRequired
}
export default Formulario;