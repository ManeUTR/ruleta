import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import './App.css';

function App() {
  // Estado para las opciones de la ruleta, con opciones iniciales
  const [data, setData] = useState([
    { option: 'Osmar' },
  ]);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winner, setWinner] = useState('');
  const [texto, setTexto] = useState("");  // para input nuevo

  // Función para iniciar el giro
  const handleSpinClick = () => {
    if (data.length === 0) return; // no girar sin opciones
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setWinner('');
  };

  // Agregar nueva opción
  const handleAgregar = () => {
    if (texto.trim() === "") return;
    setData([...data, { option: texto }]);
    setTexto("");
  };

  // Borrar última opción
  const handleBorrar = () => {
    if (data.length === 0) return;
    setData(data.slice(0, data.length - 1));
  };

  // Reiniciar (vaciar opciones y estado)
  const handleReiniciar = () => {
    setData([]);
    setWinner('');
    setMustSpin(false);
  };

  return (
    <article>
      <header>
        <div>
          <h1>Ruleta Aleatoria</h1>
        </div>      
      </header>

      <main style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
        {/* Left: ruleta */}
        <section style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className='circle'>
            {data.length > 0 ? (
            <Wheel
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
        {/* Right: controles */}
        <section style={{ flex: 1 }}>
          <div className='buttons'>
            <button onClick={handleSpinClick}>Iniciar</button>
            <button onClick={handleReiniciar}>Reiniciar</button>
            <button onClick={handleAgregar}>Agregar</button>
            <button onClick={handleBorrar}>Borrar</button>
          </div>

          <div className="entry" style={{ marginTop: '1rem' }}>
            <input
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe algo..."
              style={{ padding: '8px', width: '100%', fontSize: '1rem' }}
            />
            <p>Opciones Agregadas: {data.map(d => d.option).join(', ') || 'Ninguna'}</p>
          </div>

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
