import React, {PureComponent, ChangeEvent, Component} from 'react';
import {InputWithValueChangedEvent} from '../input-with-value-changed-event/input-with-value-changed-event';
// @ts-ignore
import ReactTimeInput from 'react-time-input';
// https://github.com/dima-bu/react-time-input

type Value = InputWithValueChangedEvent['props']['value'];
type Props = Omit<InputWithValueChangedEvent['props'], 'value'|'onChange'> & {
  value: Date | string | null;
  onChange?: (time: Date) => void;
}
type State = { value: Value; }
const formatter = Intl.DateTimeFormat('ru', {hour: 'numeric', minute: 'numeric'});

export class TimeInput extends Component<Props, State> {
  onTimeChange = (time: string) => {
    if (!this.props.onChange) return;
    const [hours, minutes] = time.split(':');
    const date = new Date(1970, 0, 1, +hours, +minutes );
    this.props.onChange(date);
  }
  render() {
    let {value, type, ...props} = this.props;
    if (typeof value === 'string') {
      value = new Date(value);
    }
    const time = formatter.format(value!);
    return (<ReactTimeInput
      // {...props}
      onTimeChange={this.onTimeChange}
      initTime={time}
    />);
  }
}
