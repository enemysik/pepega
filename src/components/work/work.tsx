import React, { Component, ReactNode } from 'react';
import { IWork } from '../../models/work';

type Props = {
  work: IWork;
}
export class Work extends Component<Props> {
  render(): ReactNode {
    const { work } = this.props;

    return (
      <div className="card">
        <div className="card-head">{work.name}</div>
        <div className="card-body">{work.description}</div>
        <div>
          {work.times.map(t => <div>{t.startTime}{t.endTime}</div>)}
        </div>
      </div>
    )
  }
}