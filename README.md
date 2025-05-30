# 🚀 FM Marketplace

O **FM Marketplace** é um projeto de **marketplace de eletrônicos** desenvolvido com o objetivo de aprimorar habilidades em aplicações web modernas utilizando **Next.js**, **TypeScript** e **Tailwind CSS**. A aplicação integra o **Stripe** para pagamentos online e a **API Melhor Envio** para cálculo de fretes, promovendo uma experiência prática em sistemas de e-commerce com autenticação segura, responsividade e boas práticas de código.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia                                      | Descrição                                                             |
| ----------------------------------------------- | --------------------------------------------------------------------- |
| [Next.js](https://nextjs.org/)                  | Framework baseado em React para desenvolvimento web com SSR e SSG.    |
| [TypeScript](https://www.typescriptlang.org/)   | Superset do JavaScript que adiciona tipagem estática.                 |
| [Tailwind CSS](https://tailwindcss.com/)        | Framework de utilitários para estilização rápida e responsiva.        |
| [Stripe](https://stripe.com/)                   | API para processamento de pagamentos online.                          |
| [MongoDB](https://www.mongodb.com/pt-br)        | Banco de dados NoSQL orientado a documentos.                          |
| [Prisma](https://www.prisma.io/)                | ORM para Node.js com tipagem segura e fácil acesso ao banco de dados. |
| [NextAuth](https://next-auth.js.org/)           | Solução de autenticação completa para aplicações Next.js.             |
| [Bcrypt](https://www.npmjs.com/package/bcrypt)  | Biblioteca para hash seguro de senhas.                                |
| [Melhor Envio](https://www.melhorenvio.com.br/) | API para cálculo e gerenciamento de fretes.                           |

---

## ⚙️ Funcionalidades

| Funcionalidade               | Descrição                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 🛒 **Listagem de Produtos**  | Exibição de produtos com detalhes e organização moderna.                                                                       |
| 🔍 Pesquisa de Produtos      | Busca dinâmica por nome, categoria ou características, filtrando resultados em tempo real para facilitar a localização rápida. |
| 🧺 **Carrinho Dinâmico**     | Adição, remoção e atualização de itens em tempo real.                                                                          |
| 💳 **Pagamento Seguro**      | Integração com Stripe para garantir transações seguras.                                                                        |
| 📱 **Design Responsivo**     | Interface moderna com adaptação a diferentes dispositivos.                                                                     |
| 🧩 **Código Escalável**      | Arquitetura modular em TypeScript com boas práticas.                                                                           |
| 🚚 **Cálculo de Frete**      | Integração com a API Melhor Envio para cálculo automático de frete.                                                            |
| 🔐 **Autenticação Segura**   | Sistema de login com NextAuth, bcrypt e MongoDB.                                                                               |
| 💲 **Formatação de Valores** | Apresentação padronizada de valores monetários.                                                                                |

---

## 📁 Estrutura de Diretórios

```bash
├── public/         # Recursos estáticos como imagens e ícones.
├── src/
│   ├── components/ # Componentes reutilizáveis da aplicação.
│   ├── app/        # Estrutura de rotas e páginas do Next.js.
│   ├── styles/     # Estilos globais e configuração do Tailwind CSS.
│   ├── utils/      # Funções auxiliares e integração com APIs externas.
│   └── types/      # Tipagens e interfaces em TypeScript.
└── README.md       # Documentação do projeto.
```

---

## 📦 Instalação

Para clonar e instalar o projeto localmente:

```bash
git clone https://github.com/seu-usuario/fm-marketplace.git
cd fm-marketplace
npm install
```

---

## ▶️ Execução do Projeto

Para rodar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🚀 Deploy

Este projeto pode ser facilmente implantado em plataformas como:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Render](https://render.com/)

Certifique-se de configurar as variáveis de ambiente corretamente no painel de deploy.

---

## 🔐 Segurança

- 🔑 **Nunca exponha chaves sensíveis**, como a `SECRET_KEY` do Stripe. Utilize variáveis de ambiente (`.env`) e mantenha-as fora do controle de versão.
- ⚠️ Adote práticas como HTTPS, CORS configurado corretamente e validações no back-end.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## ✨ Autor

Desenvolvido com 💻 por **Felipe Melo**.

- [Portfólio](https://portfoliofmg.netlify.app)
- [GitHub](https://github.com/FelipeMeloGomes)
- Contato: [WhatsApp](https://wa.me/556492600637)
