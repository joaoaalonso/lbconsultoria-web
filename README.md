# LB Consultoria de Abate

Sistema web de gestão para consultoria de abate de gado. Gerencia clientes, propriedades, abatedouros, funcionários, relatórios e análises gráficas.

## Tech Stack

- **React 18** + **TypeScript** com **Vite**
- **React Router v6** (24 rotas lazy-loaded)
- **Axios** (API client com interceptor JWT)
- **react-hook-form** (formulários)
- **pdfmake** (geração de relatórios PDF)
- **Chart.js** (gráficos e analytics)
- **sweetalert2** (alertas via wrapper customizado)
- **Vitest** + **Testing Library** (testes)
- **ESLint** + **Prettier** + **Husky** (qualidade de código)

## Pré-requisitos

- Node.js 18+
- npm

## Instalação

```bash
git clone https://github.com/joaoaalonso/lbconsultoria-web.git
cd lbconsultoria-web
npm install
cp .env.example .env
```

Edite o `.env` com a URL da API:

```
VITE_API_URL=http://localhost:4000/v1
```

## Scripts

| Comando              | Descrição                          |
| -------------------- | ---------------------------------- |
| `npm start`          | Servidor de desenvolvimento (:3000)|
| `npm run build`      | Build de produção                  |
| `npm test`           | Executa testes (uma vez)           |
| `npm run test:watch` | Executa testes em modo watch       |

## Estrutura do Projeto

```
src/
├── components/   # Componentes reutilizáveis (Button, Card, Header, Table, etc.)
├── contexts/     # AuthContext e NotificationsContext
├── hooks/        # useEntityList, usePostalCode, useTableRows
├── screens/      # Telas organizadas por domínio
├── services/     # Chamadas API e lógica de negócio
├── types/        # Interfaces TypeScript centralizadas
├── utils/        # Helpers de formatação, parsing, máscaras
└── routes.tsx    # Definição de rotas com guard de autenticação
```

## Funcionalidades

- **Autenticação** — Login com JWT, recuperação de senha, 3 níveis de acesso (Cliente, Funcionário, Admin)
- **Clientes** — Cadastro e gestão de clientes
- **Propriedades** — Gerenciamento de fazendas vinculadas a clientes
- **Abatedouros** — Cadastro de abatedouros e suas unidades
- **Funcionários** — Gestão de funcionários
- **Relatórios** — Criação e visualização de relatórios com geração de PDF
- **Precoce** — Gestão de registros de abate precoce
- **Gráficos** — Dashboard analítico com gráficos de desempenho

## Licença

Privado — Todos os direitos reservados.
