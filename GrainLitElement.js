import { html, render } from '../lit-html/lib/lit-extended.js';
import GrainElement from '../grain-element/GrainElement.js';

/**
 * Simple Usage example:
 *
 * MyElement extends GrainLitElement {
 *   renderShadowDom() {
 *     return html`<h2>my Element</h2>`;
 *   }
 *   // and/or
 *   // keep in mind rendering to light dom will overwrite your light dom
 *   renderLightDom() {
 *     return html`<h2>my Element</h2>`;
 *   }
 * }
 */
export default class GrainLitElement extends GrainElement {
  constructor() {
    super();
    if (typeof this.renderLightDom === 'function') {
      this.lightDomRendered = false;
    }
    if (typeof this.renderShadowDom === 'function') {
      this._shadyTemplate = document.createElement('template');
      this._shadyPrepared = false;
      this.shadowDomRendered = false;
      this.attachShadow({ mode: 'open' });
    }
  }

  createDomMap(rootNode, property) {
    const idNodes = rootNode.querySelectorAll(`[${property}]`);
    const map = {};
    idNodes.forEach((idNode) => {
      map[idNode.getAttribute(property)] = idNode;
    });
    return map;
  }

  afterFirstShadowDomRender() {
    this.$ = this.createDomMap(this.shadowRoot, 'id');
    this.$name = this.createDomMap(this.shadowRoot, 'name');
  }

  afterFirstLightDomRender() {
    this.$$slot = this.createDomMap(this, 'slot');
  }

  _render() {
    if (typeof this.renderLightDom === 'function') {
      render(this.renderLightDom(), this);
      if (this.lightDomRendered === false)  {
        this.lightDomRendered = true;
        this.afterFirstLightDomRender();
      }
    }
    if (typeof this.renderShadowDom === 'function') {
      render(this.renderShadowDom(), this.shadowRoot);
      if (this.shadowDomRendered === false)  {
        this.shadowDomRendered = true;
        this.afterFirstShadowDomRender();
      }
      this._applyShadyCss();
    }
  }

  _applyShadyCss() {
    // style using ShadyCSS
    if (typeof ShadyCSS === 'object') {
      if (this._shadyPrepared === false) {
        this._shadyTemplate.innerHTML = this.shadowRoot.innerHTML;
        ShadyCSS.prepareTemplate(this._shadyTemplate, this.localName);
        this._shadyPrepared = true;
      }
      ShadyCSS.styleElement(this);
      if (!ShadyCSS.nativeShadow) {
        this.shadowRoot.querySelectorAll('style').forEach((styleNode) => {
          styleNode.remove();
        });
      }
    }
  }

  updateShady() {
    this._shadyPrepared = false;
    this.update();
  }

};

export { html }
