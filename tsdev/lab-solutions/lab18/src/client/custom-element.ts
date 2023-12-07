export function customElement<T extends HTMLElement>(name: string) {
  return function (Class: { new (): T }, _: unknown): void {
    customElements.define(name, Class);
  };
}
