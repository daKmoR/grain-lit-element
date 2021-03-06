import GrainLitElement, { html } from '../GrainLitElement.js';

export default class GrainLitElementExample extends GrainLitElement {
  static get properties() {
    return {
      typeName: {
        type: String,
        value: 'warning',
        reflectToAttribute: 'type-name',
      },
      header: {
        type: String,
        value: 'Init name',
        observer: '_headerCalled',
      },
      more: {
        type: String,
        value: 'Lorem ipsum...',
      },
      items: {
        type: Array,
        value: [{ name: 'aname' }, { name: 'bname' }],
      },
    };
  }

  /**
   * On the first initial change only properties in order before you are set
   * already set: typeName, header; still undefined: more, items
   * any other change afterwards can access everything
   *
   * @param string newValue
   */
  _headerCalled(newValue) {
    if (this.shadowDomRendered) {
      console.log(this.$.more);  // eslint-disable-line
    }
    // eslint-disable-next-line
    console.log(`header on grain-lit-element-example.${this.typeName} has been updated to ${newValue}`);
  }

  renderShadowDom() {
    return html`
      <style>
        h3 { color: red; }
      </style>
      <h3 id="header">${this.header}</h3>
      <div id="more">${this.more}</div>
      <ul>
        ${this.items.map(item => html`
          <li>${item.name}</li>
        `)}
      </ul>
      <slot id="slot"></slot>
      <p>Static End</p>
    `;
  }

  renderLightDom() {
    return html`
      <div>
        <small>this is the header in light dom</small>
        <h3>${this.header}</h3>
      </div>
    `;
  }

}

customElements.define('grain-lit-element-example', GrainLitElementExample);
