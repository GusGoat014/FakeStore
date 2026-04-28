import { useParams } from "react-router-dom";
import GetProdutos from "../hooks/GetProdutos";
import "./ProdutoDetalhes.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [NumCarinho, setNumCarinho] = useState(0);

  useEffect(() => {
    async function loadProduto() {
      const res = await GetProdutos()
      const item = res.data.find(p => p.id === Number(id))
      setProduto(item)
      setNumCarinho(1)
    }

    loadProduto();
  }, [id]);

  if (!produto) {
    return <div className="loading">Carregando...</div>
  }

  function adicionarAoCarrinho() {
    if (NumCarinho <= 0) {
      toast.error("Adicione pelo menos 1 item")
      return
    }

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

    const existe = carrinho.find(item => item.id === produto.id)

    if (existe) {
      existe.quantidade += NumCarinho
    } else {
      carrinho.push({
        id: produto.id,
        quantidade: NumCarinho
      })
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho))

    toast.success(`${NumCarinho} item(ns) adicionados ao carrinho`)
  }

  function comprar() {
    if (NumCarinho <= 0) {
      toast.error("Selecione a quantidade")
      return
    }

    toast.success(`${NumCarinho} item(ns) comprados com sucesso`)
  }

  return (
    <div className="produto-detalhes">
      <div className="produto-container">
        <img src={produto.image} alt={produto.title} className="produto-imagem" />

        <button onClick={() => navigate(-1)} className="botao-voltar">Voltar</button>
        <div className="produto-info">
          <h1>{produto.title}</h1>
          <p>{produto.category}</p>
          <p>{produto.description}</p>
          <p>${produto.price}</p>

          <div className="botoes-acoes">
            <button onClick={comprar}>Comprar</button>
            <button onClick={adicionarAoCarrinho}>
              Adicionar ao carrinho
            </button>
          </div>

          <div className="quantidade-container">
            <button
              onClick={() =>
                setNumCarinho(prev => Math.max(prev - 1, 1))
              }
            >
              -
            </button>

            <input
              type="number"
              min="1"
              value={NumCarinho}
              onChange={(e) => setNumCarinho(Number(e.target.value))}
            />

            <button onClick={() => setNumCarinho(prev => prev + 1)}>
              +
            </button>
          </div>

          <div className="produto-rating">
            <span>
              Rating: {produto?.rating?.rate ?? 0} (
              {produto?.rating?.count ?? 0} reviews)
            </span>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
