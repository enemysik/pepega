import React, {ReactNode} from 'react';
import {IWorkTime} from '../../types';
import {TimeInput} from '../../../../core/components/time-input/time-input';
import './work-time.css';

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
        className="d-flex align-items-center mb-1"
        style={{backgroundColor: workTime.id === 0 ? 'grey' : 'white'}}
      >
        <span>От </span>
        <TimeInput
          onChange={(time) => this.onTimeChanged(time, 'start')}
          value={workTime.startTime}
          className="form-control time-input ml-1"
        />
        <span className="ml-1"> до </span>
        <div
          className="input-group"
          style={{width: 'unset'}}
        >
          <TimeInput
            onChange={(time) => this.onTimeChanged(time, 'end')}
            value={workTime.endTime}
            className="form-control time-input ml-1"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-danger"
              onClick={() => this.props.onDeleteTime()}
            >X</button>
          </div>
        </div>
      </div>
    );
  }
}
