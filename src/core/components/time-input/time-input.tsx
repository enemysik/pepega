import React, {PureComponent, ChangeEvent, Component, CSSProperties} from 'react';
// @ts-ignore
import ReactTimeInput from 'react-time-input';
// https://github.com/dima-bu/react-time-input

// type Value = InputWithValueChangedEvent['props']['value'];
type Props = {
  value: Date | string | null;
  onChange?: (time: Date) => void;
  style?: CSSProperties;
}
// type State = { value: Value; }
const formatter = Intl.DateTimeFormat('ru', {hour: 'numeric', minute: 'numeric'});

export class TimeInput extends Component<Props> {
  onTimeChange = (time: string) => {
    if (!this.props.onChange) return;
    const [hours, minutes] = time.split(':');
    const date = new Date(1970, 0, 1, +hours, +minutes);
    this.props.onChange(date);
  }
  render() {
    let {value, ...props} = this.props;
    if (typeof value === 'string') {
      value = new Date(value);
    }
    const time = formatter.format(value!);
    return (<ReactTimeInput
      {...props}
      onTimeChange={this.onTimeChange}
      initTime={time}
    />);
  }
}
