import React from "react";

function Card({ titulo, valor }) {
  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ color: "#666", fontSize: "14px" }}>{titulo}</h2>
      <p style={{ fontSize: "22px", fontWeight: "bold" }}>{valor}</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={{
      width: "200px",
      background: "#111",
      color: "#fff",
      height: "100vh",
      padding: "20px"
    }}>
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
    <div style={{
      background: "#fff",
      padding: "15px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
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
    <div style={{
      background: "#fff",
      padding: "20px",
      marginTop: "20px",
      borderRadius: "10px"
    }}>
      <h2>Últimos Pedidos</h2>
      <table width="100%">
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
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, background: "#f5f5f5", minHeight: "100vh" }}>
        <Header />

        <div style={{ padding: "20px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px"
          }}>
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