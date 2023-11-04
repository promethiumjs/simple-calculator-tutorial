import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";

function Button(props) {
  const buttonStyles = {
    width: "50px",
    height: "50px",
    fontSize: "20px",
    margin: "10px",
    border: "1px solid black",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return () =>
    html`<button style=${styleMap(buttonStyles)} @click=${props.onClick}>
      ${props.symbol}
    </button>`;
}

export default Button;
