import GrainLitElement from '../GrainLitElement.js';
import { html } from '../../lit-html/lit-html.js';

class GrainLitElementExample extends GrainLitElement(HTMLElement) {
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

  _headerCalled(newValue) {
    // on the first initial change only properties in order before you are set
    // already set: type, header; still undefined: more, items
    // any other change afterwards can access everything
    /* eslint-disable */
    console.log(`header on grain-lit-element-example.${this.typeName} has been updated to ${newValue}`);
    /* eslint-enable */
  }

  render() {
    return html`
      <style>
        h3 { color: red; }
      </style>
      <h3 id="header">${this.header}</h3>
      <div>${this.more}</div>
      <ul>
        ${this.items.map(item => html`
          <li>${item.name}</li>
        `)}
      </ul>
      <p>Static End</p>
    `;
  }
}

customElements.define('grain-lit-element-example', GrainLitElementExample);
