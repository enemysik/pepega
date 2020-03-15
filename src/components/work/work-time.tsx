import React, { ReactNode } from 'react';
import { IWorkTime } from '../../models/work';
import { TimeInput } from '../time-input/time-input';

type Props = {
  workTime: IWorkTime;
  onDeleteTime: () => void;
}
export class WorkTime extends React.Component<Props> {
  render(): ReactNode {
    const { workTime } = this.props;
    return (
      <div
        style={{ backgroundColor: workTime.id === 0 ? 'grey' : 'white' }}
      >
        <span>От </span>
        <TimeInput
          value={workTime.startTime}
          style={{ width: '2.7rem' }}
        />
        <span> до </span>
        <TimeInput
          value={workTime.endTime}
          style={{ width: '2.7rem' }}
        />
        <button
          className="btn btn-outline-danger"
          onClick={() => this.props.onDeleteTime()}
        >X</button>
      </div>
    )
  }
}