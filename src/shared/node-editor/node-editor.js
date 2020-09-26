import { css, defineCustomElement, html } from '../core/element.js'
import useGraphNodeMove from './use-graph-node-move.js'
import useGraphNodeSelection from './use-graph-node-selection.js'
import useMouseNavigation from './use-mouse-navigation.js'

export default defineCustomElement('w-node-editor', {
  styles: css`
    :host {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
    }

    :host([panning]) {
      cursor: all-scroll;
    }

    :host([moving]) {
      cursor: move;
    }
  `,
  template: html`
    <w-graph>
      <slot></slot>
    </w-graph>
  `,
  properties: {
    zoom: Number,
    panX: Number,
    panY: Number,
    panning: Boolean,
    moving: Boolean,
  },
  setup({ host, observe }) {
    const graph = /** @type {HTMLElement} */ (host.shadowRoot.querySelector(
      'w-graph',
    ))

    // The order does matter because each one can stop the immediate
    // propagation to the next one
    useMouseNavigation(host)
    useGraphNodeMove(host)
    useGraphNodeSelection(host)

    function transform() {
      graph.style.transform = `scale(${host.zoom}) translate(${host.panX}px, ${host.panY}px)`
    }

    observe('zoom', transform)

    observe('panX', transform)

    observe('panY', transform)
  },
})