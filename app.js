import { useState } from "react";

function App() {
  const [ideias, setIdeias] = useState([]);
  const [novaIdeia, setNovaIdeia] = useState("");
  const [erro, setErro] = useState("");

  function aoAdicionar(event) {
    event.preventDefault();

    if (novaIdeia.trim() === "") {
      setErro("Digite sua ideia antes de adicionar.");
      return;
    }

    const ideia = {
      id: Date.now(),
      texto: novaIdeia,
      feita: false,
    };

    setIdeias((atual) => [...atual, ideia]);
    setNovaIdeia("");
    setErro("");
  }

  return (
    <div>
      <h1>Painel de Ideias</h1>

      <form onSubmit={aoAdicionar}>
        <input
          type="text"
          value={novaIdeia}
          onChange={(event) => {
            setNovaIdeia(event.target.value);
            setErro("");
          }}
          placeholder="Digite sua ideia"
        />

        <button type="submit">Adicionar</button>
      </form>

      {erro && <p>{erro}</p>}

      <ul>
        {ideias.map((ideia) => (
          <li key={ideia.id}>
            {ideia.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
