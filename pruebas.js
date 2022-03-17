
class componentName extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: "open" });
  };

  static get styles(){
    return /* CSS */`
      host:{

      }
    `;
  };

  connectedCallback(){
    this.render();
  };

  render(){
    this.shadowRoot.innerHTML = /* HTML */`
    <style>${componentName.styles}</style>
      <div>
        Hello, friend!
      </div>
    `;
  };

};

customElements.define("component-name", componentName);