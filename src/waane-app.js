import { css, defineCustomElement, html } from './shared/core/element.js'
import elevation from './shared/core/elevation.js'
import useExport from './use-export.js'
import useImport from './use-import.js'

/**
 * @typedef {import('./shared/base/tab.js').default} Tab
 * @typedef {import('./audio-tracker/audio-tracker.js').default} AudioTracker
 * @typedef {import('./audio-node-editor/audio-node-editor.js').default} AudioNodeEditor
 */

const exportTooltip = 'Export'
const importTooltip = 'Import'

export default defineCustomElement('waane-app', {
  styles: css`
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    header {
      position: relative;
      display: flex;
      justify-content: center;
      background-color: rgb(var(--color-surface));
      ${elevation(4)}
    }

    .actions {
      position: absolute;
      top: 0;
      right: 4px;
      height: 100%;
      display: flex;
      align-items: center;
    }

    w-tooltip {
      margin: 0 6px;
    }

    main {
      position: relative;
      flex: 1;
    }
  `,
  template: html`
    <header>
      <w-tab>Tracks</w-tab>
      <w-tab active>Nodes</w-tab>
      <div class="actions">
        <w-tooltip text="${exportTooltip}">
          <w-button>
            <w-icon>get_app</w-icon>
          </w-button>
        </w-tooltip>
        <w-tooltip text="${importTooltip}">
          <w-button>
            <w-icon>publish</w-icon>
          </w-button>
        </w-tooltip>
      </div>
    </header>
    <main>
      <audio-tracker hidden></audio-tracker>
      <audio-node-editor active></audio-node-editor>
    </main>
  `,
  setup({ host }) {
    const [tracksTab, nodesTab] = /** @type {NodeListOf<Tab>} */ (host.shadowRoot.querySelectorAll('w-tab'))

    /** @type {HTMLElement} */
    const exportButton = host.shadowRoot.querySelector(`w-tooltip[text='${exportTooltip}'] w-button`)

    /** @type {HTMLElement} */
    const importButton = host.shadowRoot.querySelector(`w-tooltip[text='${importTooltip}'] w-button`)

    const audioTracker = /** @type {AudioTracker} */ (host.shadowRoot.querySelector('audio-tracker'))
    const audioNodeEditor = /** @type {AudioNodeEditor} */ (host.shadowRoot.querySelector('audio-node-editor'))

    useExport(exportButton, audioTracker, audioNodeEditor)
    useImport(importButton, audioTracker, audioNodeEditor)

    host.addEventListener('contextmenu', (event) => {
      event.preventDefault()
    })

    tracksTab.addEventListener('click', () => {
      nodesTab.active = false
      audioTracker.hidden = false
      audioNodeEditor.active = false
      setTimeout(() => {
        tracksTab.active = true
        audioTracker.active = true
        audioNodeEditor.hidden = true
      }, 150)
    })

    nodesTab.addEventListener('click', () => {
      tracksTab.active = false
      audioTracker.active = false
      audioNodeEditor.hidden = false
      setTimeout(() => {
        nodesTab.active = true
        audioTracker.hidden = true
        audioNodeEditor.active = true
      }, 150)
    })
  },
})
