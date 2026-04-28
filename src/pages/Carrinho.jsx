import { useEffect, useState } from "react"
import GetProdutos from "../hooks/GetProdutos"
import "./Carrinho.css"

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarCarrinho() {
      const dados = JSON.parse(localStorage.getItem("carrinho")) || []

      if (dados.length === 0) {
        setLoading(false)
        return
      }

      try {
        const response = await GetProdutos()
        const produtos = response.data

        const completo = dados
          .map(item => {
            const produto = produtos.find(p => p.id === item.id)
            if (!produto) return null

            return {
              ...produto,
              quantidade: item.quantidade || 1
            }
          })
          .filter(Boolean)

        setCarrinho(completo)
      } catch (err) {
        console.error("Erro ao carregar carrinho:", err)
      }

      setLoading(false)
    }

    carregarCarrinho()
  }, [])

  function salvarLocalStorage(lista) {
    const atualizado = lista.map(item => ({
      id: item.id,
      quantidade: item.quantidade
    }))

    localStorage.setItem("carrinho", JSON.stringify(atualizado))
  }

  function removerProduto(id) {
    const novo = carrinho.filter(item => item.id !== id)
    setCarrinho(novo)
    salvarLocalStorage(novo)
  }

  function alterarQuantidade(id, quantidade) {
    if (quantidade < 1) return

    const novo = carrinho.map(item =>
      item.id === id ? { ...item, quantidade } : item
    )

    setCarrinho(novo)
    salvarLocalStorage(novo)
  }

  function total() {
    return carrinho.reduce((acc, item) => {
      return acc + item.price * item.quantidade
    }, 0)
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className="carrinho-page">
      <div className="carrinho-header">
        <h1>Carrinho 🛒</h1>
        <p>Confira seus itens, ajuste quantidades e finalize sua compra com segurança. Cada produto no carrinho está pronto para ser enviado rapidamente.</p>
      </div>

      {carrinho.length === 0 ? (
        <div className="carrinho-empty">Seu carrinho está vazio por enquanto. Adicione produtos e volte aqui para finalizar a compra.</div>
      ) : (
        <div className="carrinho-grid">
          <div className="carrinho-items">
            {carrinho.map(item => (
              <article className="carrinho-item" key={item.id}>
                <img className="item-image" src={item.image} alt={item.title} />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="item-price">R$ {item.price.toFixed(2)}</p>
                  <div className="item-actions">
                    <label>
                      Quantidade
                      <input
                        type="number"
                        min="1"
                        value={item.quantidade}
                        onChange={(e) => alterarQuantidade(item.id, Number(e.target.value))}
                      />
                    </label>
                    <button className="remove-button" onClick={() => removerProduto(item.id)}>
                      Remover
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="carrinho-summary">
            <div className="summary-card">
              <h2>Resumo do pedido</h2>
              <p>Verifique o total dos produtos e prossiga para finalizar sua compra com facilidade.</p>
              <div className="summary-line">
                <span>Itens</span>
                <span>{carrinho.length}</span>
              </div>
              <div className="summary-line total">
                <span>Total</span>
                <span>R$ {total().toFixed(2)}</span>
              </div>
              <button className="checkout-button">Finalizar compra</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}