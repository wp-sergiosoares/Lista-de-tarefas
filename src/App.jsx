import "./App.css";

import { useEffect, useState, useMemo } from "react";

const tarefas = [
  { id: 1, texto: "Comprar pão", feito: false },
  { id: 2, texto: "Lavar o carro", feito: true },
  { id: 3, texto: "Estudar React", feito: false },
  { id: 4, texto: "Fazer exercício", feito: false },
  { id: 5, texto: "Ler um livro", feito: true },
];

import { Scan, Check, Trash } from "lucide-react";

function App() {
  const [input, setInput] = useState("");
  const [tarefasArray, setTarefasArray] = useState(tarefas);
  const [tarefasConcluidas, setTarefasConcluidas] = useState("");

  useEffect(() => {
    const concluidas = tarefasArray.filter((tarefa) => tarefa.feito === true);
    setTarefasConcluidas(concluidas.length);
  }, [tarefasArray]);

  const sorted = useMemo(() => {
    return [...tarefasArray].sort((a, b) => a.feito - b.feito);
  }, [tarefasArray]);

  const handleConcluida = (id) => {
    const filtrado = tarefasArray.map((tarefa) => {
      if (tarefa.id === id) {
        return {
          ...tarefa,
          feito: !tarefa.feito,
        };
      } else {
        return {
          ...tarefa,
        };
      }
    });
    setTarefasArray(filtrado);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    const novoId =
      tarefasArray.length > 0
        ? Math.max(...tarefasArray.map((t) => t.id)) + 1
        : 1;

    const novaTarefa = {
      id: novoId,
      texto: input,
      feito: false,
    };
    setTarefasArray([...tarefasArray, novaTarefa]);

    setInput("");
  };

  const handleRemove = (id) => {
    const filtrado = tarefasArray.filter((tarefa) => {
      if (tarefa.id != id) return tarefa;
    });
    setTarefasArray(filtrado);
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto">
        <div className="space-y-2">
          <div className="font-mono font-bold text-3xl">Lista de tarefas</div>
          <div className="text-lg">
            Concluídas: {tarefasConcluidas} / {tarefasArray.length}
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <input
                  autoFocus
                  type="text"
                  placeholder="Adicione uma tarefa..."
                  className="outline-1 outline-amber-500 rounded-full py-2 px-4 w-full "
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-2 mt-10">
          {sorted && (
            <div className="space-y-2">
              {sorted.map((tarefa) => (
                <div key={tarefa.id} className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex flex-1 gap-3 items-center"
                      onClick={() => handleConcluida(tarefa.id)}
                    >
                      <div className="relative w-5 h-5">
                        <Scan
                          size={20}
                          className={`absolute top-0 left-0 transition-opacity duration-300 ${
                            tarefa.feito ? "opacity-0" : "opacity-100"
                          }`}
                        />
                        <Check
                          size={20}
                          className={`absolute top-0 left-0 transition-opacity duration-300 text-green-600 ${
                            tarefa.feito ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </div>
                      {tarefa.feito ? (
                        <div className="text-xl line-through text-gray-600">
                          {tarefa.texto}
                        </div>
                      ) : (
                        <div className="text-xl">{tarefa.texto}</div>
                      )}
                    </div>
                    <div>
                      <Trash
                        onClick={() => handleRemove(tarefa.id)}
                        size={18}
                        className="text-red-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-sm text-gray-400">
            (Clique em uma tarefa para marcar/desmarcar)
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
