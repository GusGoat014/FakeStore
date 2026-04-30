import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [editando, setEditando] = useState(null);


  useEffect(() => {
    const loadProdutos = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error("Erro ao buscar produtos");
        }

        const data = await res.json();
        setProdutos(data);
      } catch (erro) {
        console.error("Erro:", erro);
      }
    };

    loadProdutos();
  }, []);


  const criarProduto = async () => {
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(novoProduto),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setProdutos([...produtos, data]);

    setNovoProduto({ title: "", price: "", description: "" });
  };


  const deletarProduto = async (id) => {
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });

    setProdutos(produtos.filter((p) => p.id !== id));
  };

 
  const salvarEdicao = async () => {
    const res = await fetch(
      `https://fakestoreapi.com/products/${editando.id}`,
      {
        method: "PUT",
        body: JSON.stringify(editando),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    setProdutos(
      produtos.map((p) => (p.id === data.id ? data : p))
    );

    setEditando(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard (Admin)</h1>

      <h2>Criar Produto</h2>
      <input
        placeholder="Título"
        value={novoProduto.title}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, title: e.target.value })
        }
      />
      <input
        placeholder="Preço"
        value={novoProduto.price}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, price: e.target.value })
        }
      />
      <input
        placeholder="Descrição"
        value={novoProduto.description}
        onChange={(e) =>
          setNovoProduto({
            ...novoProduto,
            description: e.target.value,
          })
        }
      />
      <button onClick={criarProduto}>Criar</button>


      <h2>Produtos</h2>

      {produtos.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
          }}
        >
          {editando?.id === p.id ? (
            <>
              <input
                value={editando.title}
                onChange={(e) =>
                  setEditando({ ...editando, title: e.target.value })
                }
              />
              <input
                value={editando.price}
                onChange={(e) =>
                  setEditando({ ...editando, price: e.target.value })
                }
              />
              <button onClick={salvarEdicao}>Salvar</button>
            </>
          ) : (
            <>
              <h3>{p.title}</h3>
              <p>R$ {p.price}</p>
              <button onClick={() => setEditando(p)}>Editar</button>
              <button onClick={() => deletarProduto(p.id)}>
                Excluir
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;