export function html(code) {
  const template = document.createElement('template');
  template.innerHTML = code;
  return template;
}

export function css(code) {
  const style = document.createElement('style');
  style.innerHTML = code;
  return style;
}

export function attach(root, template, styles = undefined, closed = true) {
  const shadowRoot = root.attachShadow({ mode: closed ? 'closed' : 'open' });
  if (styles) {
    template.content.appendChild(styles);
  }
  shadowRoot.appendChild(template.content.cloneNode(true));
  return shadowRoot;
}

export function defineComponent(name, Class) {
  customElements.define(name, Class);
}
