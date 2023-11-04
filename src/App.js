import { html } from "lit";
import { adaptState, h } from "promethium-js";
import Button from "./Button";
import { styleMap } from "lit/directives/style-map.js";

function App() {
  const containerStyles = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontFamily: "sans-serif",
  };

  const screenStyles = {
    width: "350px",
    height: "90px",
    padding: "25px",
    fontSize: "20px",
    border: "1px solid black",
    borderRadius: "5px",
    overflowX: "auto",
    marginBottom: "10px",
    whiteSpace: "nowrap",
  };

  const [calculatorOutput, setCalculatorOutput] = adaptState("");

  function backspace() {
    setCalculatorOutput(
      calculatorOutput().slice(0, calculatorOutput().length - 1),
    );
  }

  function evaluate() {
    setCalculatorOutput(
      new Function(
        `const result = ${calculatorOutput()
          .replaceAll("%", "/100")
          .replaceAll("÷", "/")
          .replaceAll("×", "*")};
         return result.toString();
          `,
      ),
    );
  }

  return () => html`
    <div style=${styleMap(containerStyles)}>
      <div style=${styleMap(screenStyles)}>${calculatorOutput()}</div>
      <div>
        <div>
          ${["(", ")", "%", "CE"].map((symbol) =>
            h(Button, {
              symbol,
              onClick:
                symbol === "CE"
                  ? backspace
                  : () => setCalculatorOutput(calculatorOutput() + symbol),
            }),
          )}
        </div>
        <div>
          ${["7", "8", "9", "÷"].map((symbol) =>
            h(Button, {
              symbol,
              onClick: () => setCalculatorOutput(calculatorOutput() + symbol),
            }),
          )}
        </div>
        <div>
          ${["4", "5", "6", "×"].map((symbol) =>
            h(Button, {
              symbol,
              onClick: () => setCalculatorOutput(calculatorOutput() + symbol),
            }),
          )}
        </div>
        <div>
          ${["1", "2", "3", "-"].map((symbol) =>
            h(Button, {
              symbol,
              onClick: () => setCalculatorOutput(calculatorOutput() + symbol),
            }),
          )}
        </div>
        <div>
          ${[".", "0", "+", "="].map((symbol) =>
            h(Button, {
              symbol,
              onClick:
                symbol === "="
                  ? evaluate
                  : () => setCalculatorOutput(calculatorOutput() + symbol),
            }),
          )}
        </div>
      </div>
    </div>
  `;
}

export default App;
