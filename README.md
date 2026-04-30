#  FakeStore

Aplicação web de e-commerce desenvolvida com **React + Vite**, projetada para simular uma experiência moderna de loja virtual. O sistema consome uma API pública para exibição de produtos e implementa funcionalidades essenciais como autenticação, carrinho de compras e controle de acesso a rotas.

---

##  Visão Geral

O **FakeStore** foi desenvolvido com foco em boas práticas de desenvolvimento front-end, organização de código e escalabilidade. O projeto demonstra a construção de uma aplicação SPA (Single Page Application), abordando desde o consumo de APIs até a gestão de estado e validação de dados.

---

##  Arquitetura e Tecnologias

### 🔹 Front-end

* **React** — Construção da interface baseada em componentes
* **Vite** — Build tool moderna e otimizada
* **React Router DOM** — Gerenciamento de rotas

### 🔹 Comunicação com API

* **Axios** — Requisições HTTP

### 🔹 Formulários e Validação

* **React Hook Form** — Gerenciamento de formulários
* **Yup** — Validação de schema
* **@hookform/resolvers** — Integração entre validação e formulários

### 🔹 Experiência do Usuário (UX)

* **React Toastify** — Feedback com notificações
* **PrimeIcons** — Ícones
* **CSS** — Estilização da aplicação


---

##  Estrutura do Projeto

```bash
src/
│
├── COMPONENTS/        # Componentes reutilizáveis (ex: Card, PrivateRoute)
├── hooks/             # Hooks customizados (ex: GetProdutos)
├── layouts/           # Estruturas reutilizáveis de layout
├── pages/             # Páginas da aplicação
│   ├── Home
│   ├── Login
│   ├── Cadastro
│   ├── Carrinho
│   ├── Dashboard
│
├── assets/            # Recursos estáticos (imagens, ícones)
├── App.jsx            # Configuração de rotas
├── main.jsx           # Ponto de entrada da aplicação
├── App.css
└── index.css
```

---

##  Funcionalidades

* **Listagem de produtos** consumidos de API externa
* **Exibição em cards** com informações detalhadas
* **Carrinho de compras** com controle de itens
* **Cadastro e login de usuários** com validação
* **Proteção de rotas privadas** (controle de acesso)
* **Dashboard do usuário**
* **Sistema de notificações** em tempo real
* **Validação robusta de formulários**

---

##  Integração com API

A aplicação consome dados da seguinte API pública:

```
https://fakestoreapi.com/products
```

As requisições são centralizadas e abstraídas por meio de hooks personalizados, promovendo reutilização e organização do código.

---

##  Autenticação e Segurança

O sistema implementa um modelo de autenticação simulada com:

* Controle de acesso a rotas privadas
* Redirecionamento de usuários não autenticados
* Separação clara entre áreas públicas e restritas

---

##  Validação de Dados

A validação dos formulários é realizada utilizando:

* **React Hook Form** para gerenciamento eficiente
* **Yup** para definição de regras e schemas

Esse conjunto garante consistência e integridade dos dados inseridos.

---

## Execução do Projeto

### Pré-requisitos

* Node.js instalado 
* Gerenciador de pacotes (npm ou yarn)

### Instalação

```bash
git clone https://github.com/seu-usuario/fakestore.git
cd fakestore
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

##  Build e Produção

Gerar build otimizada:

```bash
npm run build
```

Visualizar build localmente:

```bash
npm run preview
```

---

Interface e Experiência

O projeto prioriza:

* Organização visual e clareza
* Componentização para reutilização
* Feedback imediato ao usuário
* Estrutura preparada para evolução e escalabilidade

---

## Possíveis Evoluções

* Integração com backend real (Node.js, Firebase, etc.)
* Autenticação baseada em JWT
* Persistência de dados (carrinho e usuário)
* Sistema de busca e filtros avançados
* Responsividade completa (mobile-first)
* Implementação de checkout e pagamento
* Sistema de favoritos

---

##  Autor
Projeto desenvolvido para fins acadêmicos e aprimoramento de habilidades em desenvolvimento front-end moderno. Gustavo marcelino, Nicolas Derick, Samuel Maxiliano, Gregory Carneiro
