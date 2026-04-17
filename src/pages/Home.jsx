import { useState, useEffect } from "react";
import GetProdutos from "../hooks/GetProdutos";
import "./Home.css";
import ProdutoDetalhe from "./ProdutoDetalhes";
import { useNavigate } from "react-router-dom";
import Card from "../COMPONENTS/Card";

export default function Home(){
    const [Produtos, setProdutos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        GetProdutos().then((response) => {
            setProdutos(response.data.slice(0, 20));
        })
    }, [])

    return(
        <div className="home-container">
            <h2>Lojas perigo</h2>
            <div className="produtos-grid">
                {Produtos.map((produto) => (
                    <Card key={produto.id}>
                        <div className="imagem-container" onClick={() => navigate(`/ProdutoDetalhes/${produto.id}`)}>
                            <img src={produto.image} alt={produto.title} className="produto-imagem" />
                            <div className="overlay-detalhes">Ver detalhes</div>
                        </div>
                        <h3>{produto.title}</h3>
                        <p className="produto-categoria">{produto.category}</p>
                        <div className="produto-rating">
                            <span className="estrelas">
                                {'⭐'.repeat(Math.round(produto.rating.rate))}
                            </span>
                            <span className="rating-numero">{produto.rating.rate.toFixed(1)}</span>
                            <span className="rating-count">({produto.rating.count})</span>
                        </div>
                        <p className="produto-descricao">{produto.description.substring(0, 80)}...</p>
                        <p className="produto-preco">R$ {(produto.price * 5).toFixed(2)}</p>
                    </Card>
                ))}
            </div>
        </div>
    )
}