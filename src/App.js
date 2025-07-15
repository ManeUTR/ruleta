import { useState } from "react";
import './App.css';

function App() {

  const [texto, setTexto] = useState("");
  
  return (
    <article>
      {/* Header */}
      <header>
        <div>
          <h1>Bienvenido a la Ruleta Aleatoria</h1>
        </div>      
      </header>

      {/* Body */}
      <main>
        {/* Left */}
        <section>
          <div className='circle'>
            
          </div>
        </section>

        {/* Right */}
        <section>

          <div className='buttons'>
            <button>Iniciar</button>
            <button>Reiniciar</button>
            <button>Agregar</button>
            <button>Borrar</button>
          </div>

          <div className="entry">
                 <input
                    type="text"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Escribe algo..."
                  />
                  <p>Opciones Agregadas: {texto}</p>
          </div>


        </section>
      </main>
      
    </article>
  );
}

export default App;
