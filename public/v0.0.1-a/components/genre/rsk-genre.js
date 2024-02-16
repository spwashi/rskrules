{
  const rsk   = registerRoot();
  const Genre = class extends HTMLElement {
    static observedAttributes = ["selection"]

    constructor() {
      super();
    }

    connectedCallback() {
      const template   = document.getElementById("rsk-genre-template").content;
      const shadowRoot = this.attachShadow({mode: "open"});
      shadowRoot.appendChild(template.cloneNode(true));

      const selectionElement     = document.createElement('header');
      let selection              = this.getAttribute('selection');
      selectionElement.innerHTML = rsk.components.genre.options.get(selection);
      shadowRoot.appendChild(selectionElement);
    }
  }

  window.rskrules.components.genre = {
    options: new Map([
      ["romance", "Romance"],
      ["fantasy", "Fantasy"],
      ["sci-fi", "Sci-Fi"],
      ["adventure", "Adventure"],
      ["mystery/crime", "Mystery/Crime"],
      ["alternative history", "Alternative History"],
    ])
  }

  fetch('/public/v0.0.1-a/components/genre/rsk-genre.template.html')
    .then(r => r.text())
    .then(t => document.body.append(...rsk.util.fromHTML(t)))
    .then(() => customElements.define("rsk-genre", Genre))

  function registerRoot() {
    window.rskrules               = window.rskrules || {};
    window.rskrules.components    = window.rskrules.components || {};
    window.rskrules.util          = window.rskrules.util || {};
    window.rskrules.util.fromHTML = (html, trim = true) => {
      html = trim ? html.trim() : html;
      if (!html) return [];
      const template     = document.createElement('template');
      template.innerHTML = html;
      const result       = template.content.children;
      return [...result];
    }
    return window.rskrules;
  }
}