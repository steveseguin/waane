const template = document.createElement('template')
template.innerHTML = /* HTML */ `
  <style>
    :host {
      display: block;
    }
  </style>

  <slot></slot>
`

class NodeEditor extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('w-node-editor', NodeEditor)
