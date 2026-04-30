import React from "react";

function Card({ titulo, valor }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-gray-500 text-sm">{titulo}</h2>
      <p className="text-2xl font-bold">{valor}</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="w-60 bg-gray-900 text-white h-screen p-5">
      <h1 className="text-xl font-bold mb-6">Minha Loja</h1>
      <ul className="space-y-3">
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
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <span>Admin</span>
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
    <div className="bg-white shadow-md rounded-2xl p-4 mt-6">
      <h2 className="mb-4 font-semibold">Últimos Pedidos</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>ID</th>
            <th>Cliente</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id} className="border-b">
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
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Header />

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
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
