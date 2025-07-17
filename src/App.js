import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import './App.css';

function App() {
  //State for the roulette's initial options
  const [data, setData] = useState([
    { option: 'Osmar' }, //Array that stores options, example with our beloved Osmar <3
  ]);

  const [mustSpin, setMustSpin] = useState(false); //Not spinning at the beggining
  const [prizeNumber, setPrizeNumber] = useState(0); //To select which number is going the be the winner
  const [winner, setWinner] = useState(''); //To choose the winer
  const [texto, setTexto] = useState("");  // When we add new things

  // Spin function
  const handleSpinClick = () => {
    if (data.length === 0) return; // Don't spin if array is empty
    const newPrizeNumber = Math.floor(Math.random() * data.length); //Will generata random number less than aray lenght
    setPrizeNumber(newPrizeNumber); //Winner number
    setMustSpin(true); //We start the spinn
    setWinner('');  //Winner is set top none
  };

  // New option
  const handleAgregar = () => {
    if (texto.trim() === "") return; //If user doesn't write anything, don't add
    setData([...data, { option: texto }]); //Add texto to data array
    setTexto(""); //We restart texto
  };

  // Undo
  const handleBorrar = () => {
    if (data.length === 0) return; //Won't do anything if array's empty
    setData(data.slice(0, data.length - 1)); //We take the array, forgetting the last value
  };

  // Restart
  const handleReiniciar = () => {
    setData([]); //Empty array
    setWinner(''); //No winner
    setMustSpin(false); //Stop spinnig
  };

  return (
    <article>
      <header>
        <div>
          <h1>Ruleta Aleatoria</h1>
        </div>      
      </header>

      <main>
        {/* Left: Roulette */}
        <section>

          <div className='circle'>
            {/* If data length its greater than 0, we execute the code for spinning */}
            {data.length > 0 ? (
            <Wheel
             //We fill the values of wheel with the variable we declared on functions
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              onStopSpinning={() => {
                setMustSpin(false);
                if (data.length > 0) setWinner(data[prizeNumber].option);
              }}
              backgroundColors={["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC300"]}
              textColors={["#ffffff"]}
            />
          ) : (
            <p>Añade una opción</p>
          )}

          </div>
        </section>
        {/* Right: Buttons and Entry */}
        <section>
          {/* Buttons for executing the functions */}
          <div className='buttons'>
            <button onClick={handleSpinClick}>Iniciar</button>
            <button onClick={handleReiniciar}>Reiniciar</button>
            <button onClick={handleAgregar}>Agregar</button>
            <button onClick={handleBorrar}>Borrar</button>
          </div>

          <div className="entry" style={{ marginTop: '1rem' }}>
            {/* Input for writing the options */}
            <input
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe algo..."
              style={{ padding: '8px', width: '100%', fontSize: '1rem' }}
            />
            {/* Show actual options */}
            <p>Opciones Agregadas: {data.map(d => d.option).join(', ') || 'Ninguna'}</p>
          </div>
          {/* Show winner */}
          {winner && (
            <h2 style={{ marginTop: "20px", fontSize: "24px", color: "#333" }}>
             Ganador: {winner} 
            </h2>
          )}
        </section>
      </main>
    </article>
  );
}

export default App;
