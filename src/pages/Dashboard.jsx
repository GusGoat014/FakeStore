import React from "react";
import "./Dashboard.css";

function Card({ titulo, valor }) {
  return (
    <div className="card">
      <h2>{titulo}</h2>
      <p>{valor}</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <h1>Minha Loja</h1>
      <ul>
        <li>Dashboard</li>
        <li>Produtos</li>
        <li>Pedidos</li>
        <li>Usuários</li>
      </ul>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>Dashboard</h1>
    </div>
  );
}

function TabelaPedidos() {
  const pedidos = [
    { id: 1, cliente: "João", valor: "R$ 120" },
    { id: 2, cliente: "Maria", valor: "R$ 80" },
    { id: 3, cliente: "Carlos", valor: "R$ 200" }
  ];

  return (
    <div className="tabela-pedidos">
      <h2>Últimos Pedidos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.cliente}</td>
              <td>{p.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="content">
        <Header />

        <div className="content-padding">
          <div className="cards-grid">
            <Card titulo="Faturamento" valor="R$ 5000" />
            <Card titulo="Pedidos" valor="120" />
            <Card titulo="Usuários" valor="45" />
          </div>

          <TabelaPedidos />
        </div>
      </div>
    </div>
  );
}