import React, { Component, ReactNode } from 'react';
import { IWork } from '../../models/work';
import { TimeInput } from '../time-input/time-input';
import { WorkTime } from './work-time';

type Props = {
  work: IWork;
  onWorkChange: (work: IWork) => void;
  onWorkChangeRemote: (work: IWork) => void;
}
export class Work extends Component<Props> {
  render(): ReactNode {
    const { work } = this.props;

    return (
      <div className="card">
        <div className="card-head">
          <input
            className="form-control"
            onChange={(e) => this.props.onWorkChange({ ...this.props.work, name: e.target.value })}
            onBlur={(e) => this.props.onWorkChangeRemote({ ...this.props.work, name: e.target.value })}
            value={work.name}
          />
        </div>
        <div className="card-body">
          <textarea
            className="form-control"
            value={work.description || ''}
          />
        </div>
        <div>
          {work.times.map(wt => <WorkTime key={wt.id} workTime={wt} />)}
        </div>
      </div>
    )
  }
}