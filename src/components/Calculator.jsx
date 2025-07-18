// Código comentado para não futuro eu lembrar o que fiz e como fiz
import React, { useState, useEffect, useCallback } from "react";
import "./Calculator.css";
import Container from "@mui/material/Container";

function Calculator() {
  // Estado principal do número exibido no visor, sempre como string para facilitar manipulação
  const [num, setNum] = useState("0");
  // Guarda o número anterior para operações (ex: 2 + 3)
  const [oldNum, setOldNum] = useState("0");
  // Guarda o operador selecionado (+, -, *, /)
  const [operator, setOperator] = useState("");
  // Estado para controlar se o próximo input deve substituir o visor
  const [waitingForNewNum, setWaitingForNewNum] = useState(false);

  // Função chamada ao clicar em um operador. Resolve a operação anterior (se houver) e prepara para a próxima
  const handleOperator = useCallback(
    (op) => {
      if (operator !== "") {
        // Salva o resultado da operação anterior antes de definir o novo operador
        const current = Number(num.replace(",", "."));
        const previous = Number(oldNum.replace(",", "."));
        let result;
        switch (operator) {
          case "+":
            result = previous + current;
            break;
          case "-":
            result = previous - current;
            break;
          case "*":
            result = previous * current;
            break;
          case "/":
            if (current === 0) {
              alert("Não é possível dividir por zero!");
              setNum("Erro");
              setOperator("");
              setOldNum("0");
              setWaitingForNewNum(true);
              return;
            }
            result = previous / current;
            break;
          default:
            result = current;
        }
        const resultStr = String(result).replace(".", ",");
        setNum(resultStr);
        setOldNum(resultStr);
        setOperator(op);
        setWaitingForNewNum(true); // Próximo input deve substituir o visor
      } else {
        setOldNum(num);
        setOperator(op);
        setWaitingForNewNum(true); // Próximo input deve substituir o visor
        //setNum("0");
      }
    },
    [num, oldNum, operator, setNum, setOldNum, setOperator, setWaitingForNewNum]
  );

  const inputNum = useCallback(
    (e) => {
      const input = e.target.value;
      // Impede múltiplas vírgulas no mesmo número
      if (input === "," && num.includes(",")) return;
      // Limita a 10 caracteres no visor
      if (num.length >= 10) return;
      // Evita múltiplos zeros à esquerda
      if (num === "0" && input === "0") return;
      // Se o visor for 0 e o input for vírgula, começa com "0,"
      if (num === "0" && input === ",") {
        setNum("0,");
        setWaitingForNewNum(false);
        return;
      }
      // Se deve substituir o visor, começa novo número
      if (waitingForNewNum) {
        setNum(input);
        setWaitingForNewNum(false);
        return;
      }
      // Se o visor for 0, substitui pelo input
      if (num === "0") {
        setNum(input);
        return;
      }
      // Caso geral: concatena o novo dígito ao número atual
      setNum(num + input);
    },
    [num, waitingForNewNum, setNum, setWaitingForNewNum]
  );

  // Limpa todos os estados (visor, número antigo e operador)
  function clear() {
    setNum("0");
    setOldNum("0");
    setOperator("");
    setWaitingForNewNum(false);
  }

  // Realiza o cálculo ao pressionar o igual, converte vírgula para ponto para cálculo, exibe resultado com vírgula
  const equals = useCallback(() => {
    const current = Number(num.replace(",", "."));
    const previous = Number(oldNum.replace(",", "."));
    let result;
    switch (operator) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "*":
        result = previous * current;
        break;
      case "/":
        if (current === 0) {
          alert("Não é possível dividir por zero!");
          setNum("Erro");
          setOperator("");
          setOldNum("0");
          setWaitingForNewNum(true);
          return;
        }
        result = previous / current;
        break;
      default:
        return;
    }
    setNum(String(result).replace(".", ","));
    setOperator("");
    setOldNum(String(result).replace(".", ",")); // Permite operação contínua
  }, [num, oldNum, operator, setNum, setOperator, setOldNum, setWaitingForNewNum]);

  // Inverte o sinal do número atual
  function operatorChange() {
    const valor = Number(num.replace(",", "."));
    setNum(String(-valor).replace(".", ","));
  }

  // Calcula a porcentagem do número atual
  function calculateRelativePercentage() {
    const toNumber = (str) => Number(str.replace(",", "."));
    const toString = (num) => String(num).replace(".", ",");

    const currentValue = toNumber(num);
    const previousValue = toNumber(oldNum);

    const isBinaryOperation = operator && oldNum !== "0";

    if (isBinaryOperation) {
      // Aplica a porcentagem relativa ao valor anterior
      const percentValue = (previousValue * currentValue) / 100;

      // Resolve a operação binária com o valor percentual
      let result;
      switch (operator) {
        case "+":
          result = previousValue + percentValue;
          break;
        case "-":
          result = previousValue - percentValue;
          break;
        case "*":
          result = previousValue * percentValue;
          break;
        case "/":
          if (percentValue === 0) {
            alert("Não é possível dividir por zero!");
            setNum("Erro");
            setOperator("");
            setOldNum("0");
            setWaitingForNewNum(true);
            return;
          }
          result = previousValue / percentValue;
          break;
        default:
          result = percentValue;
      }

      setNum(toString(result));
      setOldNum(toString(result));
      setOperator(""); // Zera o operador após a operação
    } else {
      // Caso seja apenas número único (sem operador)
      const percentValue = currentValue / 100;
      setNum(toString(percentValue));
    }

    setWaitingForNewNum(false);
  }

  // Adiciona suporte ao teclado físico
  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key;

      // Mapeia teclas para as funções da calculadora
      if (!isNaN(key)) {
        // Números (0-9)
        inputNum({ target: { value: key } });
      } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        handleOperator(key);
      } else if (key === "Enter" || key === "=") {
        equals();
      } else if (key === "Backspace") {
        if (num === "Erro") {
          clear();
        } else {
          setNum((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
        }
      } else if (key === "Escape" || key.toLowerCase() === "c") {
        // Limpa tudo
        clear();
      } else if (key === "," || key === ".") {
        if (!num.includes(",")) {
          inputNum({ target: { value: "," } });
        }
      }
    }

    // Adiciona o evento de teclado
    window.addEventListener("keydown", handleKeyDown);

    // Remove o evento ao desmontar o componente
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [num, oldNum, operator, waitingForNewNum, equals, handleOperator, inputNum]);

  return (
    <>
      <Container maxWidth="sm">
        <div className="wrapper">
          <div className="display">
            <span className="display-text" aria-label="Visor da calculadora">{num}</span>{" "}
          </div>
          <button className="sand" onClick={clear} aria-label="Limpar visor">
            C
          </button>
          <button className="sand" onClick={operatorChange} aria-label="Inverter sinal">
            +/-
          </button>
          <button className="sand" onClick={calculateRelativePercentage} aria-label="Porcentagem">
            %
          </button>
          <button className="blue" onClick={() => handleOperator("/")} aria-label="Divisão">
            /
          </button>
          <button className="button" onClick={inputNum} value="7" aria-label="7">
            7
          </button>
          <button className="button" onClick={inputNum} value="8" aria-label="8">
            8
          </button>
          <button className="button" onClick={inputNum} value="9" aria-label="9">
            9
          </button>
          <button className="blue" onClick={() => handleOperator("*")} aria-label="Multiplicação">
            *
          </button>
          <button className="button" onClick={inputNum} value="4" aria-label="4">
            4
          </button>
          <button className="button" onClick={inputNum} value="5" aria-label="5">
            5
          </button>
          <button className="button" onClick={inputNum} value="6" aria-label="6">
            6
          </button>
          <button className="blue" onClick={() => handleOperator("-")} aria-label="Subtração">
            -
          </button>
          <button className="button" onClick={inputNum} value="1" aria-label="1">
            1
          </button>
          <button className="button" onClick={inputNum} value="2" aria-label="2">
            2
          </button>
          <button className="button" onClick={inputNum} value="3" aria-label="3">
            3
          </button>
          <button className="blue" onClick={() => handleOperator("+")} aria-label="Soma">
            +
          </button>
          <button className="button zero-button" onClick={inputNum} value="0" aria-label="0">
            0
          </button>
          <button className="button" onClick={inputNum} value="," aria-label="Vírgula">
            ,
          </button>
          <button className="blue equals-button" onClick={equals} aria-label="Igual">
            =
          </button>
        </div>
      </Container>
      <footer className="footer-calc">
        Desenvolvido por Daniely Mélo{" "}
        <a href="https://www.linkedin.com/in/daniiom" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>{" "}
        /
        <a href="https://github.com/daniolivem" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </footer>
    </>
  );
}

export default Calculator;
