import { useState, useEffect } from "react";
import GetProdutos from "../hooks/GetProdutos";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import Card from "../COMPONENTS/Card";

export default function Dashboard(){
    const [Produtos, setProdutos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            navigate('/login');
            return;
        }
        GetProdutos().then((response) => {
            const preferred = response.data.filter(produto => currentUser.preferredProducts.includes(produto.id));
            setProdutos(preferred);
        });
    }, [navigate]);

    return(
        <div className="dashboard-container">
            <h2>Dashboard - Produtos Preferidos</h2>
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
                                {'⭐'.repeat(Math.min(5, Math.max(0, Math.floor(produto.rating.rate || 0))))}
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