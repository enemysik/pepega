import React, {ReactNode} from 'react';
import {IWorkTime} from '../../models/work';
import {TimeInput} from '../time-input/time-input';

type Props = {
  workTime: IWorkTime;
  onDeleteTime: () => void;
  onChange?: (timeRange: IWorkTime) => void;
}
export class WorkTime extends React.Component<Props> {
  onTimeChanged(time: Date, type: 'start' | 'end') {
    if (!this.props.onChange) return;
    this.props.onChange({
      id: this.props.workTime.id,
      startTime: type === 'start' ? time.toJSON() : this.props.workTime.startTime,
      endTime: type === 'end' ? time.toJSON() : this.props.workTime.endTime,
    });
  }
  render(): ReactNode {
    const {workTime} = this.props;
    return (
      <div
        style={{backgroundColor: workTime.id === 0 ? 'grey' : 'white'}}
      >
        <span>От </span>
        <TimeInput
          onChange={(time) => this.onTimeChanged(time, 'start')}
          value={workTime.startTime}
          style={{width: '2.7rem'}}
        />
        <span> до </span>
        <TimeInput
          onChange={(time) => this.onTimeChanged(time, 'end')}
          value={workTime.endTime}
          style={{width: '2.7rem'}}
        />
        <button
          className="btn btn-outline-danger"
          onClick={() => this.props.onDeleteTime()}
        >X</button>
      </div>
    );
  }
}
