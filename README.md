# FM Marketplace

O **FM Marketplace** é um projeto de **marketplace** criado com o intuito de estudar e aprimorar habilidades no desenvolvimento de aplicações web utilizando **Next.js**, **TypeScript** e **Tailwind CSS**. O projeto também integra o **Stripe** para processamento de pagamentos, oferecendo uma experiência prática em sistemas de e-commerce. O foco principal é fortalecer as competências no desenvolvimento front-end, entender melhor as funcionalidades essenciais de um marketplace e explorar as melhores práticas de integração de APIs e autenticação de usuários.

---

## 🛠️ Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** - Framework React para desenvolvimento web.
- **[TypeScript](https://www.typescriptlang.org/)** - Superset do JavaScript que adiciona tipagem estática.
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utilitário para estilização.
- **[Stripe](https://stripe.com/)** - API para processamento de pagamentos.
- **[MongoDB](https://www.mongodb.com/pt-br)** - Banco de dados NoSQL.
- **[Prisma](https://www.prisma.io/)** - ORM (Object-Relational Mapper) para Node.js, facilitando o acesso a bancos de dados.
- **[NextAuth](https://next-auth.js.org/)** - Sistema de autenticação para Next.js.
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** - Biblioteca para criptografia de senhas.
- **[Melhor Envio](https://www.melhorenvio.com.br/)** - API para cálculo de frete e envio de pacotes.

---

# Funcionalidades do Marketplace de Eletrônicos

- **Listagem de Produtos**: Explore uma ampla variedade de produtos disponíveis para compra.
- **Carrinho de Compras Dinâmico**: Adicione, remova ou atualize itens no carrinho em tempo real.
- **Pagamento Seguro**: Integração com o Stripe para garantir transações rápidas e seguras.
- **Interface Responsiva e Moderna**: Desenvolvida com Tailwind CSS, garantindo uma ótima experiência em qualquer dispositivo.
- **Código Escalável**: Organização eficiente em TypeScript, facilitando a manutenção e o crescimento do projeto.
- **Cálculo de Frete Automatizado**: Integração com a API Melhor Envio para oferecer valores precisos de entrega.
- **Sistema de Autenticação Seguro**: Implementação com NextAuth, bcrypt e MongoDB para proteger os dados dos usuários.

---

## 📂 Estrutura de Diretórios

```bash
├── public/         # Recursos estáticos como imagens e ícones.
├── src/
│   ├── components/ # Componentes reutilizáveis da aplicação.
│   ├── app/        # Páginas do Next.js.
│   ├── styles/     # Estilos globais e configurações do Tailwind CSS.
│   ├── utils/      # Funções auxiliares e configuração do Stripe.
│   └── types/      # Definições de tipos TypeScript.
└── README.md       # Este arquivo.
```

---

## 🛡️ Segurança

- Certifique-se de nunca expor sua chave secreta do Stripe em código público. Utilize variáveis de ambiente e boas práticas de segurança.

---
