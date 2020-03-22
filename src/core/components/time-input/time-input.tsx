import React, {Component} from 'react';
// @ts-ignore
import ReactTimeInput from 'react-time-input';
// https://github.com/dima-bu/react-time-input

type Props = {
  value: Date | string | null;
  onChange?: (time: Date) => void;
  className?: string;
}
const formatter = Intl.DateTimeFormat('ru', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'});

export class TimeInput extends Component<Props> {
  shouldComponentUpdate() {
    return false;
  }
  onTimeChange = (time: string) => {
    if (!this.props.onChange) return;
    const [hours, minutes] = time.split(':');
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +hours + 7, +minutes);
    this.props.onChange(date);
  }
  _convertToTime(value: Props['value']) {
    if (typeof value === 'string') {
      value = new Date(value);
    }
    return formatter.format(value!);
  }
  render() {
    const {value, ...props} = this.props;
    const time = this._convertToTime(value);
    return (<ReactTimeInput
      {...props}
      onTimeChange={this.onTimeChange}
      initTime={time}
    />);
  }
}
