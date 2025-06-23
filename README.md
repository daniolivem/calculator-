# Calculadora React – Capacita Brasil

![Calculadora](public/calculator.png)

## Sobre o Projeto

Esta é uma calculadora web desenvolvida em React especialmente para a oficina do Capacita Brasil. O objetivo é demonstrar conceitos de React, boas práticas de UX, acessibilidade e documentação, além de servir como base para estudos e customizações futuras.

## Funcionalidades

- **Operações básicas:** Soma, subtração, multiplicação e divisão.
- **Operação contínua:** Permite realizar cálculos sequenciais sem precisar pressionar igual a cada etapa.
- **Controle de entrada:**
  - Limite de 10 dígitos no visor.
  - Impede múltiplas vírgulas e zeros à esquerda.
  - Início correto de números decimais.
- **Tratamento de erros:**
  - Divisão por zero exibe mensagem de erro e alerta.
- **Acessibilidade:**
  - Todos os botões e visor possuem `aria-label` para leitores de tela.
- **UX aprimorada:**
  - Botão "0" mais largo, botão de igual destacado.
  - Rodapé personalizado com links do desenvolvedor.
- **Código comentado:**
  - Explicações detalhadas para facilitar o entendimento e a replicação.

## Demonstração

![Demonstração da calculadora](public/calculator.png)

## Como usar

### 1. Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn

### 2. Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/daniolivem/calculator-react-capacita.git
cd calculator-react-capacita
npm install
```

### 3. Execução

```bash
npm start
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura do Projeto

```
public/
  calculator.png
  ...
src/
  components/
    Calculator.jsx
    Calculator.css
  App.js
  ...
README.md
```

## Tecnologias Utilizadas
- [React](https://reactjs.org/)
- [Material UI](https://mui.com/) (apenas Container)
- CSS Grid e Flexbox

## Acessibilidade
- Todos os botões e visor possuem `aria-label`.
- Contraste adequado e navegação por teclado.

## Personalização
- O código está amplamente comentado para facilitar adaptações.
- Para alterar estilos, edite `src/components/Calculator.css`.
- Para modificar a lógica, edite `src/components/Calculator.jsx`.

## Créditos
Desenvolvido por [Daniely Mélo](https://www.linkedin.com/in/daniiom)

- [LinkedIn](https://www.linkedin.com/in/daniiom)
- [GitHub](https://github.com/daniolivem)

Projeto criado para a oficina Capacita Brasil.

## Licença
Este projeto está sob a licença MIT. Sinta-se à vontade para usar, estudar e modificar!

---

> Dúvidas, sugestões ou feedback? Entre em contato pelo LinkedIn ou abra uma issue no GitHub.
