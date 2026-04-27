import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GetProdutos from "../hooks/GetProdutos"
import "./ProdutoDetalhes.css"

export default function ProdutoDetalhe(){
  const { id } = useParams()
  const [produto, setProduto] = useState(null)

  useEffect(() => {
    async function loadProduto(){
      const res = await GetProdutos()
      const item = res.data.find(p => p.id === Number(id))
      setProduto(item)
    }

    loadProduto()
  }, [id])

  if (!produto) {
    return <div className="loading">Carregando...</div>
  }

  return (
    <div className="produto-detalhes">
      <div className="produto-container">
        <img src={produto.image} alt={produto.title} className="produto-imagem" />
        <div className="produto-info">
          <h1 className="produto-titulo">{produto.title}</h1>
          <p className="produto-categoria">{produto.category}</p>
          <p className="produto-descricao">{produto.description}</p>
          <p className="produto-preco">${produto.price}</p>
          <div className="produto-rating">
            <span>Rating: {produto.rating.rate} ({produto.rating.count} reviews)</span>
          </div>
        </div>
      </div>
    </div>
  )
}