# Site Calçados - CryoWraith

E-commerce para venda de calçados com gestão de estoque e pedidos simples.

## Link do Repositório

https://github.com/SamuelSilva000/cryo_wraith_repository

## Objetivo

Permitir a venda de calçados de forma prática, garantindo que o número esteja disponível no estoque.

## Escopo

Incluído:
- Acesso de usuários
- Lista de produtos
- Carrinho de compras
- Área do administrador
- Controle de numeração

Excluído:
- Pagamento online real
- Sistema de logística

Telas:
- Home
- Produtos
- Detalhes
- Carrinho
- Checkout
- Perfil
- Contato
- Administrador

## Tecnologias

- Frontend: Angular 17+ (TypeScript, RxJS, CSS puro)
- Backend: Spring Boot 3.x (Java, Spring Security, JWT)
- Banco de Dados: H2 Database Engine

## Equipe

- Pedro Wallas - Product Owner / Frontend
- Fernando Silva - Tech Lead Frontend
- Samuel Silva - Tech Lead Backend
- Leonardo Cavalcanti - DevOps/QA / Backend

## Cronograma

- Início: 01/03/2026
- Telas prontas: 20/03/2026
- Backend pronto: 15/04/2026
- Site funcionando: 27/05/2026

## Risco Principal

Venda do mesmo número de calçado para duas pessoas.

Solução: o sistema bloqueia o número no banco de dados assim que é adicionado ao carrinho.
