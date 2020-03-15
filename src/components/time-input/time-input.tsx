import React, {PureComponent, ChangeEvent} from 'react';
import {InputWithValueChangedEvent} from '../input-with-value-changed-event/input-with-value-changed-event';

type Value = InputWithValueChangedEvent['props']['value'];
type Props = Omit<InputWithValueChangedEvent['props'], 'value'> & {
  value: Date | string | null;
}
type State = { value: Value; }
const formatter = Intl.DateTimeFormat('ru', {hour: 'numeric', minute: 'numeric'});

export class TimeInput extends PureComponent<Props, State> {
  onTimeChange = () => {
  }
  render() {
    let {value, type, ...props} = this.props;
    if (typeof value === 'string') {
      value = new Date(value);
    }
    const time = formatter.format(value!);
    return (<InputWithValueChangedEvent
      {...props}
      onChange={this.onTimeChange}
      value={time}
    />);
  }
}
