import React from 'react';

type Props<T extends HTMLElement> = React.HTMLProps<T>;

export function fromHtml<
  K extends keyof HTMLElementTagNameMap,
  E extends HTMLElementTagNameMap[K]
>(tagName: K): React.StatelessComponent<Props<E>> {
  return function (props: Props<E>) {
    return React.createElement(tagName, props);
  };
}