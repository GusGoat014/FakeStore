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
    setProdutos(produtos.map((p) => (p.id === data.id ? data : p)));
    setEditando(null);
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-subtitle">Painel Admin</p>
          <h1>Dashboard de Produtos</h1>
        </div>
        <div className="dashboard-stats">{produtos.length} produtos</div>
      </header>

      <section className="dashboard-panel">
        <div className="dashboard-form card">
          <div className="dashboard-panel-header">
            <h2>Criar novo produto</h2>
            <p>Adicione produtos rápidos ao catálogo.</p>
          </div>

          <div className="form-group">
            <label>Título</label>
            <input
              className="input"
              placeholder="Título"
              value={novoProduto.title}
              onChange={(e) =>
                setNovoProduto({ ...novoProduto, title: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Preço</label>
            <input
              className="input"
              placeholder="Preço"
              value={novoProduto.price}
              onChange={(e) =>
                setNovoProduto({ ...novoProduto, price: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <input
              className="input"
              placeholder="Descrição"
              value={novoProduto.description}
              onChange={(e) =>
                setNovoProduto({
                  ...novoProduto,
                  description: e.target.value,
                })
              }
            />
          </div>

          <button className="button button--primary" onClick={criarProduto}>
            Criar produto
          </button>
        </div>

        <div className="dashboard-list card">
          <div className="dashboard-panel-header">
            <h2>Produtos</h2>
            <p>Gerencie itens existentes e atualize rapidamente.</p>
          </div>

          <div className="product-grid">
            {produtos.map((p) => (
              <article className="product-card" key={p.id}>
                <div>
                  <div className="product-card-title">
                    <h3>{p.title}</h3>
                    <span className="product-price">R$ {p.price}</span>
                  </div>
                  <p>{p.description}</p>
                </div>

                {editando?.id === p.id ? (
                  <div className="product-edit-form">
                    <input
                      className="input"
                      value={editando.title}
                      onChange={(e) =>
                        setEditando({ ...editando, title: e.target.value })
                      }
                    />
                    <input
                      className="input"
                      value={editando.price}
                      onChange={(e) =>
                        setEditando({ ...editando, price: e.target.value })
                      }
                    />
                    <div className="dashboard-actions">
                      <button
                        className="button button--primary"
                        onClick={salvarEdicao}
                      >
                        Salvar
                      </button>
                      <button
                        className="button button--secondary"
                        onClick={() => setEditando(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="dashboard-actions">
                    <button
                      className="button button--secondary"
                      onClick={() => setEditando(p)}
                    >
                      Editar
                    </button>
                    <button
                      className="button button--danger"
                      onClick={() => deletarProduto(p.id)}
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
