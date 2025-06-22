import React, { useState } from "react";
import "./Calculator.css";
import Container from "@mui/material/Container";

function Calculator() {
  const [num, setNum] = useState(0);

  function inputNum(valor) {
    // setNum(valor);
    console.log(valor);
  }

  // const [operator, setOperator] = useState("");

  return (
    <Container maxWidth="sm">
      <div className="wrapper">
        <div className="display">
          <span className="display-text">{num}</span> </div>
        <button className="sand">C</button>
        <button className="sand">+/-</button>
        <button className="sand">%</button>
        <button className="blue">/</button>
        <button className="button" onClick={() => inputNum(7)}>7</button>
        <button className="button" onClick={() => inputNum(8)}>8</button>
        <button className="button" onClick={() => inputNum(9)}>9</button>
        <button className="blue">*</button>
        <button className="button" onClick={() => inputNum(4)}>4</button>
        <button className="button" onClick={() => inputNum(5)}>5</button>
        <button className="button" onClick={() => inputNum(6)}>6</button>
        <button className="blue">-</button>
        <button className="button" onClick={() => inputNum(1)}>1</button>
        <button className="button" onClick={() => inputNum(2)}>2</button>
        <button className="button" onClick={() => inputNum(3)}>3</button>
        <button className="blue">+</button>
        <button className="button zero-button" onClick={() => inputNum(0)}>0</button>
        <button className="button" onClick={() => inputNum(".")}>.</button>
        <button className="blue equals-button">=</button>
      </div>
    </Container>
  );
}

export default Calculator;
