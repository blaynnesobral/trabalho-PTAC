import { useState } from "react";

function App() {
  const [ideias, setIdeias] = useState([]);
  const [novaIdeia, setNovaIdeia] = useState("");
  const [erro, setErro] = useState("");

  function adicionar(event) {
    event.preventDefault();

    // Verifica se o campo está vazio
    if (novaIdeia.trim() === "") {
      setErro("Digite sua ideia antes de adicionar.");
      return;
    }

    const nova = {
      id: Date.now(),
      texto: novaIdeia,
      feita: false
    };

    setIdeias([...ideias, nova]);
    setNovaIdeia("");
    setErro("");
  }

  function concluir(id) {
    const lista = ideias.map((ideia) => {
      if (ideia.id === id) {
        return {
          ...ideia,
          feita: !ideia.feita
        };
      }

      return ideia;
    });

    setIdeias(lista);
  }

  function remover(id) {
    const lista = ideias.filter((ideia) => ideia.id !== id);

    setIdeias(lista);
  }

  return (
    <div className="container">
      <h1>Painel de Ideias</h1>

      <form onSubmit={adicionar}>
        <input
          type="text"
          value={novaIdeia}
          onChange={(event) => {
            setNovaIdeia(event.target.value);
            setErro("");
          }}
          placeholder="Digite sua ideia..."
        />

        <button type="submit">Adicionar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <ul>
        {ideias.map((ideia) => (
          <li key={ideia.id}>
            <input
              type="checkbox"
              checked={ideia.feita}
              onChange={() => concluir(ideia.id)}
            />

            <span
              className={ideia.feita ? "feita" : ""}
            >
              {ideia.texto}
            </span>

            <button
              className="remover"
              onClick={() => remover(ideia.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <p className="contador">
        {ideias.length} ideias no painel ·{" "}
        {ideias.filter((ideia) => ideia.feita).length} concluídas
      </p>
    </div>
  );
}

export default App;