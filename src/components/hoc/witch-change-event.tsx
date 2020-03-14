import React, { ComponentType, ComponentClass, Component, ReactNode } from 'react';

type Input = JSX.IntrinsicElements['input'] | JSX.IntrinsicElements['textarea'];
type Value = Input['value'];
type Props = {
  valueChanged?: (value: Value) => void
}
type State = { value: Value }
export function withChangeEvent<T extends Input>(Child: ComponentType<T>): ComponentClass<Props & T> {
  return class WithChangeEventComponent extends Component<Props & T, State> {
    static displayName = `withChangeEvent(${Child.displayName || Child.name})`;
    focused = () => {
      this.setState({ value: this.props.value })
    }
    blurred = () => {
      if (this.state.value !== this.props.value) {
        if (this.props.valueChanged) {
          this.props.valueChanged(this.props.value);
        }
      }
    }
    render(): ReactNode {
      return (
        <Child
          onFocus={this.focused}
          onBlur={this.blurred}
          {...this.props}
        />
      )
    }
  }
}