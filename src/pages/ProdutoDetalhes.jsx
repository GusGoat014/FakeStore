import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetProdutos from "../hooks/GetProdutos";
import "./ProdutoDetalhes.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [NumCarinho, setNumCarinho] = useState(0);

  useEffect(() => {
    async function loadProduto() {
      const res = await GetProdutos();
      const item = res.data.find((p) => p.id === Number(id));
      setProduto(item);
    }

    loadProduto();
  }, [id]);

  if (!produto) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="produto-detalhes">
      <div className="produto-container">
        <button onClick={() => navigate(-1)} className="botao-voltar">Voltar</button>
        <img
          src={produto.image}
          alt={produto.title}
          className="produto-imagem"
        />
        <div className="produto-info">
          <h1 className="produto-titulo">{produto.title}</h1>
          <p className="produto-categoria">{produto.category}</p>
          <p className="produto-descricao">{produto.description}</p>
          <p className="produto-preco">${produto.price}</p>
          <div className="botoes-acoes">
            <button
              onClick={() => {
                toast.success(NumCarinho + " itens comprados com sucesso");
              }}
            >
              Comprar
            </button>
            <button
              onClick={() => {
                toast.success(
                  NumCarinho + " itens adicionados no carinho sucesso",
                );
              }}
            >
              Adicionar ao carinho
            </button>
          </div>
          <div className="quantidade-container">
            <button
              onClick={() => {
                NumCarinho > 0
                  ? setNumCarinho((NumCarinho) => NumCarinho - 1)
                  : console.log("carinho não pode ter menos que 0");
              }}
            >
              -
            </button>
            <input
              value={NumCarinho}
              onChange={(texto) => {
                setNumCarinho(Number(texto.target.value));
              }}
              type="text"
            />
            <button
              onClick={() => {
                setNumCarinho(NumCarinho + 1);
              }}
            >
              +
            </button>
          </div>
          <div className="produto-rating">
            <span>
              Rating: {produto.rating.rate} ({produto.rating.count} reviews)
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
