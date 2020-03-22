import React, {Component, ReactNode} from 'react';
import {IWork, IWorkTime} from '../../types';
import {WorkTime} from './work-time';
import {withChangeEvent} from '../../../../core/hoc/witch-change-event';
import {fromHtml} from '../../../../core/hoc/from-html';

const Input = withChangeEvent(fromHtml('input'));
const Textarea = withChangeEvent(fromHtml('textarea'));
type Props = {
  work: IWork;
  onWorkChange: (work: IWork) => void;
  onWorkChangeRemote: (work: IWork) => void;
  onDelete: () => void;
  onDeleteTime: (timeRangeId: number) => void;
  onTimeCreate: () => void;
  onTimeChange: (time: IWorkTime) => void;
}
export class Work extends Component<Props> {
  render(): ReactNode {
    const {work} = this.props;

    return (
      <div
        className="card"
        style={{backgroundColor: work.id === 0 ? 'grey' : 'white'}}
      >
        <div className="card-head">
          <Input
            className="form-control"
            placeholder="Название"
            onChange={(e) => this.props.onWorkChange({...this.props.work, name: e.currentTarget.value})}
            valueChanged={(v) => this.props.onWorkChangeRemote({...this.props.work, name: v as string})}
            value={work.name}
          />
          <button className="btn btn-outline-danger" onClick={() => this.props.onDelete()}>Delete</button>
          <button className="btn btn-outline-success" onClick={() => this.props.onTimeCreate()}>Add time</button>
        </div>
        <div className="card-body">
          <Textarea
            className="form-control"
            placeholder="Описание"
            onChange={(e) => this.props.onWorkChange({...this.props.work, description: e.currentTarget.value})}
            valueChanged={(v) => this.props.onWorkChangeRemote({...this.props.work, description: v as string})}
            value={work.description || ''}
          />
        </div>
        <div>
          {work.times.slice().sort((a, b) => a.id - b.id).map((wt) => <WorkTime
            key={wt.id}
            workTime={wt}
            onChange={(time) => this.props.onTimeChange(time)}
            onDeleteTime={() => this.props.onDeleteTime(wt.id)}
          />)}
        </div>
      </div>
    );
  }
}
