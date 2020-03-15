import React, {PropsWithoutRef, PureComponent} from 'react';

type Value = PropsWithoutRef<JSX.IntrinsicElements['input']>['value'];
type Props = PropsWithoutRef<JSX.IntrinsicElements['input']> & {
  valueChanged?: (value: Value) => void;
}
type State = { value: Value; }

export class InputWithValueChangedEvent extends PureComponent<Props, State> {
  focused = () => {
    this.setState({value: this.props.value});
  }
  blurred = () => {
    if (this.state.value !== this.props.value) {
      if (this.props.valueChanged) {
        this.props.valueChanged(this.props.value);
      }
    }
  }
  render() {
    return (<input
      onFocus={this.focused}
      onBlur={this.blurred}
      {...this.props}
    />);
  }
}
