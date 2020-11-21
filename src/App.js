import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spiner from './components/Spiner';


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #ffffff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;


function App() {

  const [ moneda, guardarMoneda ] = useState('');
  const [ criptoMoneda, guardarCriptomoneda ] = useState('');
  const [ resultado, guardarResultado ] = useState({});
  const [ cargar, guardarCargando ] = useState(false);


  useEffect(() => {

    const cotizarCriptomoneda = async () => {

      /* evitamos la ejecucion la primera vez, solo aparece cuando realizamos el submit */
      if(moneda === '')
      return;

      /* consultamos la api nuevamente para hacer la cotizacion */
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
      
      const resultado = await axios.get(url);

      /* mostrar spiner */
      guardarCargando(true);

      /* oculartar el spiner y mostrar resultado */
      setTimeout(() => {

        /* cambiar el estado de cargando */
        guardarCargando(false);

        /* guardar cotizacion */
        guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
      }, 2000);

    }

    cotizarCriptomoneda();

  }, [moneda, criptoMoneda]);

  /* mostrar spiner o resutlado */

  const componente = (cargar) ? <Spiner /> :  <Cotizacion resultado={resultado}/>


  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt='imagen cripto'
        />
      </div>
      <div>
        <Heading>Cotiza Ciprtomonedas al Instante</Heading>

        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}

      </div>
      </Contenedor>
     
  );
}

export default App;
